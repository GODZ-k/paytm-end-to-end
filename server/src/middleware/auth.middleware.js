import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const SECRET = "secret";

export const verifyJWT = async (req, res, next) => {
  try {

    console.log(req.cookies)
    let token = "";
    if (req.cookies.length > 0) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log(token);

    if (!token) {
      return res.status(400).json({
        msg: "Unauthorized access",
      });
    }

    const decodedValue = jwt.verify(token, SECRET);

    const user = await User.findById(decodedValue._id).select(
      "-password  -refreshToken"
    );

    if (!user) {
      return res.status(400).json({
        msg: "Unauthorized access",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error)
  }
};
