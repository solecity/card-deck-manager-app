// libraries
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import httpStatus from "http-status-codes";

// model
import User from "../models/user.js";

// constants
import { GENERAL, LOGIN } from "../constants/messages.js";

dotenv.config();

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: LOGIN.UNAUTHENTICATED });
    }

    if (token === null) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: GENERAL.UNAUTHORIZED });
    }

    const userToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(userToken.id);

    if (!user) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: LOGIN.UNAUTHENTICATED });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
