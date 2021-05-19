// libraries
import httpStatus from "http-status-codes";

// model
import Card from "../models/card.js";

// constants
import { USER_TYPES } from "../constants/general.js";
import { GENERAL, CARD } from "../constants/messages.js";

export const getCards = async (req, res) => {
  try {
    const loggedUser = req.user;
    let cards = [];

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      cards = await Card.find({ user: loggedUser._id });
    } else {
      cards = await Card.find();
    }

    return res.status(httpStatus.OK).json(cards);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCard = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const card = await Card.findById(_id);

    if (!card) {
      return res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (card.user !== loggedUser._id) {
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
    const card = new Card(req.body);

    await card.save();

    return res.status(httpStatus.CREATED).json({ card, message: CARD.CREATED });
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
      if (card.user !== loggedUser._id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    await card.remove();

    return res.status(httpStatus.OK).json({ message: CARD.DELETED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
