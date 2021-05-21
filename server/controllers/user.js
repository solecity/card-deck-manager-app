// libraries
import httpStatus from "http-status-codes";

// model
import User from "../models/user.js";
import Card from "../models/card.js";
import Collection from "../models/collection.js";

// constants
import { USER_TYPES } from "../constants/general.js";
import { GENERAL, USER } from "../constants/messages.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(httpStatus.OK).json(users);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (loggedUser.id !== _id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: USER.CONFLIT_USERNAME });
    }

    const data = new User(req.body);

    await data.save();

    const newUser = data.toObject();
    delete newUser.password;

    return res
      .status(httpStatus.CREATED)
      .json({ user: newUser, message: USER.CREATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { password } = req.body;
    const loggedUser = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    if (loggedUser.id !== _id) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: GENERAL.UNAUTHORIZED });
    }

    user.password = password;

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    return res
      .status(httpStatus.OK)
      .json({ user: updatedUser, message: USER.UPDATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateUserType = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { type } = req.body;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    user.type = type;

    await user.save();

    return res.status(httpStatus.OK).json({ user, message: USER.UPDATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    if (loggedUser.id === _id) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: USER.FORBIDDEN_DELETE });
    }

    await Card.deleteMany({ user: _id });

    await Collection.deleteMany({ user: _id });

    await user.remove();

    return res.status(httpStatus.OK).json({ message: USER.DELETED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
