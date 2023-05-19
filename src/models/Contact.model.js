import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    contactUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    contactName: {
      type: String,
      required: false,
    },

    roomId: {
      type: String,
      required: false,
    },

    blocked: {
      type: Boolean,
      required: false,
      default: false,
    },

    starred: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true, strict: false }
);

const User = mongoose.model("User", UserSchema);
export default User;
