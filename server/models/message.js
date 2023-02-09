const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const MessageSchema = new mongoose.Schema(
  {
    body: { type: String },
    fileUrl: { type: String },
    sender: {
      type: ObjectId,
      ref: "User",
    },
    chat: {
      type: ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
