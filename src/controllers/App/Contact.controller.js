import express from "express";
const router = express.Router();
import Joi from "joi";
import User from "../../models/User.model";
import Contact from "../../models/Contact.model";

router.post("/create-contact", async (req, res) => {
  let validator = Joi.object({
    contactUserId: Joi.string().required(),
    contactName: Joi.string().required(),
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

    let user = await User.findOne({ _id: data.contactUserId });

    if (!user) {
      return res.status(404).json({
        message: "User does not exists",
      });
    }

    let contact = await Contact.findOne({
      userId: req.user._id,
      contactUser: data.contactUserId,
    });

    if (contact) {
      return res.status(400).json({
        message: "Contact already exists",
      });
    }

    let roomId = generateUUIDToken();

    let contactObj = new Contact({
      userId: req.user._id,
      contactUser: data.contactUserId,
      contactName: data.contactName,
      roomId,
    });

    await contactObj.save();

    return res.status(200).json({
      message: "New contact created!",
      ContactObject: contactObj,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in create contact",
      error: err,
    });
  }
});

router.post("/star-contact", async (req, res) => {
  let validator = Joi.object({
    contactId: Joi.string().required(),
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

    let contact = await Contact.findOne({ _id: data.contactId });

    if (!contact) {
      return res.status(404).json({
        message: "Contact does not exists",
      });
    }

    if (contact.starred) {
      return res.status(400).json({
        message: "Contact is already starred",
      });
    }

    contact.starred = true;
    await contact.save();

    return res.status(200).json({
      message: "contact starred successfully!",
      ContactObject: contactObj,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in starring contact",
      error: err,
    });
  }
});

router.post("/archive-contact", async (req, res) => {});
router.post("/block-contact", async (req, res) => {});

router.put("/update-contact", async (req, res) => {});
router.delete("/delete-contact", async (req, res) => {});
router.get("/load-contacts", async (req, res) => {});

export default router;
