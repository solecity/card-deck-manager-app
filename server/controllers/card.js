// libraries
import httpStatus from "http-status-codes";

// model
import Card from "../models/card.js";

// constants
import { CARD } from "../constants/messages.js";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find();

    return res.status(httpStatus.OK).json(cards);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCard = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const card = await Card.findById(_id);

    if (!card) {
      return res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    return res.status(httpStatus.OK).json(card);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const card = new Card(req.body);

    await card.save();

    return res.status(httpStatus.CREATED).json({ card, message: CARD.CREATED });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    await Card.findByIdAndDelete(id, (err, doc) => {
      if (err || !doc) {
        res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
      }
    });

    return res.status(httpStatus.OK).json({ message: CARD.DELETED });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
