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
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCard = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const card = await Card.findById(_id);

    if (!card) {
      res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    return res.status(httpStatus.OK).json(card);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
