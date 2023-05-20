import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    createdUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    contactUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;
