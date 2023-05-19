import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    toUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    roomId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: false }
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
