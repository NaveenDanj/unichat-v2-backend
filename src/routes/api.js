import express from "express";
const router = express.Router();
import AuthController from "../controllers/Auth.controller.js";
import ContactController from "../controllers/App/Contact.controller.js";
import UserAuthRequired from "../middlewares/UserAuthRequired.middleware.js";
import ChatController from "../controllers/App/Chat.controller.js";

router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Unichat-v2 api",
  });
});

router.use("/auth", AuthController);
router.use("/contact", UserAuthRequired(), ContactController);
router.use("/chat", UserAuthRequired(), ChatController);

export default router;
