import express from "express";
const router = express.Router();
import Joi from "joi";
import User from "../models/User.model.js";
import AuthToken from "../models/AuthToken.model.js";
import { hashPasswod } from "../services/hash.service.js";
import { generateUUIDToken } from "../services/token.service.js";

router.post("/login", async (req, res) => {
  let validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    let data = await validator.validateAsync(req.body, { abortEarly: false });

    let user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(400).json({
        message: "Email or password is incorrect!",
      });
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Email or password is incorrect!",
      });
    }

    let _token = generateToken(user.email);

    let accessToken = new AuthToken({
      userId: user._id,
      token: _token,
    });

    await accessToken.save();

    return res.status(200).json({
      user,
      token: _token,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error in user login.",
      error: err,
    });
  }
});

router.post("/register-with-social-account", async (req, res) => {
  let validator = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
    password: Joi.string().required(),
  });

  try {
    await validator.validateAsync(req.body, { abortEarly: false });
    const hashedPassword = await hashPasswod(req.body.password);
    let user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      photoUrl: "not setup",
    });

    // check of user email
    let email_check = await User.findOne({ email: req.body.email });
    if (email_check) {
      return res.status(400).json({
        message: "Email already used in another account!",
      });
    }

    // check for user phone
    let phone_check = await User.findOne({ phone: req.body.phone });
    if (phone_check) {
      return res.status(400).json({
        message: "Phone number already used in another account!",
      });
    }

    let userObject = await user.save();

    // send otp to the phone number later
    // _handle_otp(user);

    return res.status(201).json({
      message: "New user created",
      user: userObject,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error creating user",
      error: err,
    });
  }
});

router.get("/me", async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

const _handle_otp = async (user) => {
  return new Promise(async (resolve, reject) => {
    let token = generateUUIDToken();
    let otp = new OTP({
      phone: user.phone,
      token: token,
      otp: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
    });
    await otp.save();
    resolve(token);
  });
};

// const _handle_jwt = async (user) => {
//   return new Promise(async (resolve, reject) => {
//     let token = generateToken(user.email);

//     let tokenObj = new AuthToken({
//       userId: user._id,
//       token: token,
//     });

//     await tokenObj.save();

//     resolve(token);
//   });
// };

export default router;
