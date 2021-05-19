// libraries
import httpStatus from "http-status-codes";

// model
import User from "../models/user.js";

// constants
import { USER } from "../constants/messages.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(httpStatus.OK).json(users);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    const newUser = user.toObject();
    delete newUser.password;

    return res
      .status(httpStatus.CREATED)
      .json({ user: newUser, message: USER.CREATED });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // update or err
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id, (err, doc) => {
      if (err || !doc) {
        res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
      }
    });

    return res.status(httpStatus.OK).json({ message: USER.DELETED });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
