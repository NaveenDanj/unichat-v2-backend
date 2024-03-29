import jwt from "jsonwebtoken";

export const generateToken = function (email) {
  return jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const generateAdminToken = function (email) {
  return jwt.sign({ email: email, type: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//   async handle_jwt(user) {
//     return new Promise(async (resolve, reject) => {
//       let token = this.generateToken(user.email);

//       let tokenObj = new AuthToken({
//         userId: user._id,
//         token: token,
//       });

//       await tokenObj.save();

//       resolve(token);
//     });
//   },
