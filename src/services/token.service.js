import { v4 } from "uuid";

// generate random token for reset password link
export const generateUUIDToken = function () {
  return v4();
};
