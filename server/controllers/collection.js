// libraries
import mongoose from "mongoose";
import httpStatus from "http-status-codes";

// model
import User from "../models/user.js";
import Card from "../models/card.js";
import Collection from "../models/collection.js";

// constants
import { USER_TYPES } from "../constants/general.js";
import { GENERAL, USER, CARD, COLLECTION } from "../constants/messages.js";

const { isValidObjectId } = mongoose;

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate("user cards");
    return res.status(httpStatus.OK).json(collections);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getUserCollections = async (req, res) => {
  try {
    const loggedUser = req.user;

    const collections = await Collection.find({
      user: loggedUser._id
    }).populate("user cards");

    return res.status(httpStatus.OK).json(collections);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const collection = await Collection.findById(_id).populate({
      path: "user cards",
      populate: {
        path: "user",
        model: "User"
      }
    });

    if (!collection) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: COLLECTION.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(collection.user._id) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    return res.status(httpStatus.OK).json(collection);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const loggedUser = req.user;
    const data = req.body;

    if (!data.user) {
      data.user = loggedUser._id;
    }

    if (!isValidObjectId(data.user)) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    const user = await User.findById(data.user);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    if (data.cards && Boolean(data.cards.length)) {
      const cards = await Card.find();

      for (const i in data.cards) {
        if (
          !isValidObjectId(data.cards[i]._id) ||
          !cards.some((card) => card.id === data.cards[i]._id)
        ) {
          return res
            .status(httpStatus.NOT_FOUND)
            .json({ card: data.cards[i], message: CARD.NOT_FOUND });
        }

        const card = await Card.findById(data.cards[i]._id);

        if (loggedUser.type !== USER_TYPES.ADMIN) {
          if (String(card.user._id) !== loggedUser.id) {
            return res.status(httpStatus.FORBIDDEN).json({
              card: data.cards[i],
              message: CARD.DOES_NOT_BELONG_LOGGED_USER
            });
          }
        } else {
          if (String(card.user._id) !== String(data.user._id)) {
            return res.status(httpStatus.FORBIDDEN).json({
              card: data.cards[i],
              message: CARD.DOES_NOT_BELONG_USER
            });
          }
        }
      }
    }

    const collection = new Collection(data);

    await collection.save();

    return res
      .status(httpStatus.CREATED)
      .json({ collection, message: COLLECTION.CREATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const data = req.body;
    const loggedUser = req.user;

    const collection = await Collection.findById(_id);

    if (!collection) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: COLLECTION.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(collection.user) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    collection.name = data.name;
    collection.user = data.user || collection.user;

    await collection.save();

    return res
      .status(httpStatus.OK)
      .json({ collection, message: COLLECTION.UPDATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateCollectionCards = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const newCards = req.body;
    const loggedUser = req.user;

    const collection = await Collection.findById(_id);

    if (!collection) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: COLLECTION.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(collection.user) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    const cards = await Card.find();

    for (const i in newCards) {
      if (
        !isValidObjectId(newCards[i]._id) ||
        !cards.some((card) => card.id === newCards[i]._id)
      ) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ card: newCards[i]._id, message: CARD.NOT_FOUND });
      }

      const card = await Card.findById(newCards[i]._id);

      if (loggedUser.type !== USER_TYPES.ADMIN) {
        if (String(card.user) !== loggedUser.id) {
          return res.status(httpStatus.FORBIDDEN).json({
            card: newCards[i]._id,
            message: CARD.DOES_NOT_BELONG_LOGGED_USER
          });
        }
      } else {
        if (String(card.user) !== String(collection.user)) {
          return res.status(httpStatus.FORBIDDEN).json({
            card: newCards[i]._id,
            message: CARD.DOES_NOT_BELONG_USER
          });
        }
      }
    }

    collection.cards = [...new Set(newCards)];

    await collection.save();

    return res
      .status(httpStatus.OK)
      .json({ collection, message: COLLECTION.UPDATED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const loggedUser = req.user;

    const collection = await Collection.findById(_id);

    if (!collection) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: COLLECTION.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(collection.user._id) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    await collection.remove();

    return res.status(httpStatus.OK).json({ message: COLLECTION.DELETED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
