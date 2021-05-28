// libraries
import mongoose from "mongoose";
import httpStatus from "http-status-codes";

// models
import User from "../models/user.js";
import Card from "../models/card.js";
import Collection from "../models/collection.js";

// constants
import { USER_TYPES } from "../constants/general.js";
import { GENERAL, USER, CARD, COLLECTION } from "../constants/messages.js";

const { Types, isValidObjectId } = mongoose;

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("user");

    return res.status(httpStatus.OK).json(cards);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUserCards = async (req, res) => {
  try {
    const loggedUser = req.user;
    const cards = await Card.find({ user: loggedUser._id }).populate("user");

    return res.status(httpStatus.OK).json(cards);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCard = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const card = await Card.findById(_id).populate("user");

    if (!card) {
      return res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(card.user._id) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    return res.status(httpStatus.OK).json(card);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const loggedUser = req.user;
    const data = req.body;

    if (!data.user) {
      data.user = {
        _id: loggedUser._id,
        username: loggedUser.username
      };
    }

    if (!isValidObjectId(data.user._id)) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    const user = await User.findById(data.user._id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    const card = new Card(data);

    await card.save();

    return res.status(httpStatus.CREATED).json({ card, message: CARD.CREATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const data = req.body;
    const loggedUser = req.user;

    const card = await Card.findById(_id);

    if (!card) {
      return res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(card.user._id) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    if (data.user) {
      if (!isValidObjectId(data.user._id)) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: USER.NOT_FOUND });
      }

      const user = await User.findById(data.user._id);

      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: USER.NOT_FOUND });
      }
    }

    card.name = data.name;
    card.description = data.description;
    card.value = data.value;
    card.user = data.user || card.user;

    await card.save();

    return res.status(httpStatus.OK).json({ card, message: CARD.UPDATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const card = await Card.findById(_id);

    if (!card) {
      return res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(card.user._id) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    Collection.updateMany(
      {},
      { $pull: { cards: Types.ObjectId(_id) } },
      (error) => {
        if (error) {
          return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: error.message });
        }
      }
    );

    await card.remove();

    return res.status(httpStatus.OK).json({ message: CARD.DELETED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
