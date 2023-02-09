const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server-express");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const {
  message: { postMessage },
} = require("../joi-schemas");
const { Chat, Message } = require("../models");
const { CRYPTO_FILE_SECRET } = require("../config");
const pubsub = require("../pubsub");

const newMessageSub = "NEW_MESSAGE";

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    userMessages: async (_, { userId }) => {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError(`${userId} is not a valid user ID.`);
      }
      return await Message.find({ sender: userId });
    },
  },
  Mutation: {
    postMessage: async (_, args) => {
      const validation = await postMessage.validate(args, {
        abortEarly: false,
      });
      if (validation.error) {
        throw new UserInputError(validation.error.message);
      }

      let fileUrl = "";
      const { body, sender, chatId } = args;
      if (args.file) {
        const { createReadStream, filename } = await args.file;
        const { ext } = path.parse(filename);
        const randomName =
          crypto
            .createHmac("sha256", CRYPTO_FILE_SECRET)
            .update(filename)
            .digest("hex") + ext;

        const stream = createReadStream();
        const pathName = path.join(__dirname, `../public/images/${randomName}`);
        await stream.pipe(fs.createWriteStream(pathName));
        fileUrl = `http://localhost:4000/images/${randomName}`;
      }

      const message = await Message.create({
        body,
        sender,
        chat: chatId,
        fileUrl,
      });
      await Chat.updateOne({ _id: chatId }, { lastMessage: message.id });

      pubsub.publish(newMessageSub, {
        newMessage: { ...message._doc, id: message._id, updatedAt: Date.now() },
      });

      return message;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([newMessageSub]),
    },
  },
  Message: {
    sender: async (message) => {
      return (await Message.findById(message._id).populate("sender")).sender;
    },
  },
};
