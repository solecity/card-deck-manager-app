// libraries
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import httpStatus from "http-status-codes";

// model
import User from "../models/user.js";

// constants
import { LOGIN } from "../constants/messages.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username }).select("+password");

    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json({ message: LOGIN.UNAUTHORIZED });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (!err || result) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
          expiresIn: process.env.JWT_DURATION
        });

        return res.status(httpStatus.OK).json({ token, auth: true });
      } else {
        res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: LOGIN.UNAUTHORIZED });
      }
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
