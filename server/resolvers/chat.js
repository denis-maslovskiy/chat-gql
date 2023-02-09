const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server-express");
const {
  chat: { startChat },
} = require("../joi-schemas");
const { Chat, User, Message } = require("../models");
const pubsub = require("../pubsub");

const newChatSub = "NEW_CHAT";

module.exports = {
  Query: {
    chatMessages: async (_, { chatId }) => {
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new UserInputError(`${chatId} is not a valid chat ID.`);
      }

      return await Message.find({ chat: chatId });
    },
  },
  Mutation: {
    startChat: async (_, args) => {
      const validation = await startChat.validate(args, {
        abortEarly: false,
      });
      if (validation.error) {
        throw new UserInputError(validation.error.message);
      }

      const { title, userIds } = args;

      const chat = await Chat.create({
        title,
        users: userIds,
      });

      await User.updateMany(
        { _id: { $in: userIds } },
        {
          $push: { chats: chat },
        }
      );

      pubsub.publish(newChatSub, {
        newChat: { ...chat._doc, id: chat._id, updatedAt: Date.now() },
      });

      return chat;
    },
  },
  Subscription: {
    newChat: {
      subscribe: () => pubsub.asyncIterator([newChatSub]),
    },
  },
  Chat: {
    messages: async (chat) => {
      return await Message.find({ chat: chat.id });
    },
    users: async (chat) => {
      return (await Chat.findById(chat._id).populate("users")).users;
    },
    lastMessage: async (chat) => {
      return (await Chat.findById(chat._id).populate("lastMessage"))
        .lastMessage;
    },
  },
};
