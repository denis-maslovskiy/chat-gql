const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const ChatSchema = new mongoose.Schema(
  {
    title: { type: String },
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
