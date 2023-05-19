import express from "express";
const router = express.Router();
import Joi from "joi";

router.post("/create-contact", async (req, res) => {
  let validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
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
  } catch (err) {
    return res.status(500).json({
      message: "Error in create contact",
      error: err,
    });
  }
});

router.post("/star-contact", async (req, res) => {});
router.post("/archive-contact", async (req, res) => {});
router.post("/block-contact", async (req, res) => {});

router.put("/update-contact", async (req, res) => {});
router.delete("/delete-contact", async (req, res) => {});
router.get("/load-contacts", async (req, res) => {});

export default router;
