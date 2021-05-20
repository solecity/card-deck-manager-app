// libraries
import mongoose from "mongoose";
import httpStatus from "http-status-codes";

// constants
import { GENERAL } from "../constants/messages.js";

const { isValidObjectId } = mongoose;

export const validateId = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: GENERAL.INVALID_ID });
    }

    return next();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
