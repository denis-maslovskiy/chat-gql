const mongoose = require("mongoose");
const { UserInputError } = require("apollo-server-express");
const { User } = require("../models");
const {
  user: { signIn, signUp, updateUser },
} = require("../joi-schemas");
const Auth = require("../auth");

module.exports = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`);
      }

      return await User.findById(id);
    },
  },
  Mutation: {
    signUp: async (_, args) => {
      const validation = await signUp.validate(args, {
        abortEarly: false,
      });
      if (validation.error) {
        throw new UserInputError(validation.error.message);
      }

      const user = await User.create(args);

      return user;
    },
    signIn: async (_, args) => {
      const validation = await signIn.validate(args, {
        abortEarly: false,
      });
      if (validation.error) {
        throw new UserInputError(validation.error.message);
      }

      const { user, token } = await Auth.attemptSignIn(
        args.email,
        args.password
      );

      return { user, token };
    },
    updateUser: async (_, args) => {
      const validation = await updateUser.validate(args, { abortEarly: false });
      if (validation.error) {
        throw new UserInputError(validation.error.message);
      }

      const { userId, chatsToCheck } = args;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { chatsToCheck },
        { new: true }
      );

      return user;
    },
  },
  User: {
    chats: async (user) => {
      return (await user.populate("chats")).chats;
    },
  },
};
