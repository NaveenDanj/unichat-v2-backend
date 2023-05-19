import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import AuthToken from "../models/AuthToken.model.js";

const UserAuthRequired = () => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).send({ error: "Unauthenticated" });
    }

    // in future check if token is in blacklist(logged out before token expired)
    try {
      let checkExists = await AuthToken.findOne({ token: token });

      if (!checkExists) {
        return res.status(401).send({ error: "Unauthenticated" });
      }
    } catch (err) {
      return res.status(401).send({ error: "Unauthenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, userObject) => {
      if (err) return res.status(403).json({ message: "Unauthenticated" });

      try {
        let user = await User.findOne({ email: userObject.email }).select(
          "-password"
        );

        req.user = user;

        next();
      } catch (err) {
        return res.status(401).send({ error: "Unauthenticated" });
      }
    });
  };
};

export default UserAuthRequired;
