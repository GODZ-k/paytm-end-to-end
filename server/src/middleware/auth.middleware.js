import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const SECRET = "secret";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies
    ? req.cookies.accessToken
    : req.headers
    ? req.headers("Authorization")
      ? req.headers("Authorization").split(" ")[1]
      : null
    : null;
  
    if (!token) {
    return res.status(400).json({
      msg: "Unauthorized access",
    });
  }

  const decodedValue = jwt.verify(token, SECRET);

  const user = await User.findById(decodedValue._id).select("-password  -refreshToken")

  if (!user) {
    return res.status(400).json({
      msg: "Unauthorized access",
    });
  }

  req.user = user;
  
  next()

  } catch (error) {
    throw new Error("unauthorized access" , error)
  }

};
