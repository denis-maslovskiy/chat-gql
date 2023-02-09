const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (email) => User.doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken`,
      },
    },
    username: {
      type: String,
      unique: true,
      validate: {
        validator: (username) => User.doesntExist({ username }),
        message: ({ value }) => `Username ${value} has already been taken`,
      },
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    name: { type: String },
    password: { type: String },
    chatsToCheck: { type: Array, default: [] },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.statics.doesntExist = async function (option) {
  return (await this.where(option).countDocuments()) === 0;
};

UserSchema.methods.matchesPassword = function (password) {
  return password === this.password;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
