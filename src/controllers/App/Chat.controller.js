import express from "express";
const router = express.Router();
import Joi from "joi";
import Room from "../../models/Room.model";
import Chat from "../../models/Chat.model";

router.post("/create-chat", async (req, res) => {
  let validator = Joi.object({
    toUser: Joi.string().required(),
    roomId: Joi.string().required(),
    message: Joi.string().required(),
  });

  try {
    let data;

    try {
      data = await validator.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        message: "Request validation error",
        error: err,
      });
    }

    let toUser = await User.findOne({ _id: data.toUser });

    if (!toUser) {
      return res.status(404).json({
        message: "Receiver not found!",
      });
    }

    let room = await Room.findOne({ _id: data.roomId });

    if (!room) {
      return res.status(404).json({
        message: "Chat room not found!",
      });
    }

    if (room.createdUser != req.user._id && room.createdUser != data.toUser) {
      return res.status(400).json({
        message: "User cannot chat in this chat room",
      });
    }

    let chat = new Chat({
      fromUser: req.user._id,
      toUser: data.toUser,
      roomId: room._id,
      message: message,
    });

    await chat.save();

    return res.status(200).json({
      message: "New chat created!",
      chat,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in creating chat",
      error: err,
    });
  }
});

router.delete("/delete-chat", async (req, res) => {
  let validator = Joi.object({
    chatId: Joi.string().required(),
  });

  try {
    let data;

    try {
      data = await validator.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        message: "Request validation error",
        error: err,
      });
    }

    let chat = await Chat.findOne({ _id: data.chatId });

    if (!chat) {
      return res.status(404).json({
        message: "Request validation error",
        error: err,
      });
    }

    if (chat.fromUser != req.user._id) {
      return res.status(404).json({
        message: "User not authorized to delete this chat",
        error: err,
      });
    }

    await Chat.deleteOne({ _id: data.chatId });

    return res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in deleting chat",
      error: err,
    });
  }
});



export default router;
