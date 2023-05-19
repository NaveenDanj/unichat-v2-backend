import express from "express";
const router = express.Router();
const AuthController = require("../controllers/Auth.controller");

router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Unichat-v2 api",
  });
});

router.use("/auth", AuthController);
router.use("/contact");

export default router;
