import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AuthTokenSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      default: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: "30d",
    },
  },
  { timestamps: true }
);

const AuthToken = mongoose.model("AuthToken", AuthTokenSchema);
export default AuthToken;
