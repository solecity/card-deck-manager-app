// libraries
import httpStatus from "http-status-codes";

// constants
import { USER_TYPES } from "../constants/general.js";
import { GENERAL } from "../constants/messages.js";

export const adminAuthorization = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.type !== USER_TYPES.ADMIN) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: GENERAL.UNAUTHORIZED });
    }

    return next();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
