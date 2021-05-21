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

const { Types, isValidObjectId } = mongoose;

export const getCollections = async (req, res) => {
  try {
    const loggedUser = req.user;
    let collections = [];

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      collections = await Collection.find({ user: loggedUser._id });
    } else {
      collections = await Collection.find();
    }

    return res.status(httpStatus.OK).json(collections);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
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
      if (String(collection.user) !== loggedUser.id) {
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

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      data.user = loggedUser._id;
    }

    if (!isValidObjectId(data.user)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: USER.INVALID_ID });
    }

    const user = await User.findById(data.user);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: USER.NOT_FOUND });
    }

    if (data.cards && Boolean(data.cards.length)) {
      let notValid = false;
      let notFound = false;

      const cards = await Card.find();

      data.cards.map((id) => {
        if (!isValidObjectId(id)) {
          notValid = true;
        }

        if (!cards.some((card) => card.id === id)) {
          notFound = true;
        }
      });

      if (notValid) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: CARD.INVALID_ID });
      }

      if (notFound) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: CARD.NOT_FOUND });
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
    collection.cards = data.cards || collection.cards;
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
    const cardId = req.body.card;
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

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(httpStatus.NOT_FOUND).json({ message: CARD.NOT_FOUND });
    }

    if (loggedUser.type !== USER_TYPES.ADMIN) {
      if (String(card.user) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: CARD.DOES_NOT_BELONG_LOGGED_USER });
      }
    } else {
      if (String(card.user) !== String(collection.user)) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: CARD.DOES_NOT_BELONG_USER });
      }
    }

    collection.cards.unshift(card);

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
      if (String(collection.user) !== loggedUser.id) {
        return res
          .status(httpStatus.FORBIDDEN)
          .json({ message: GENERAL.UNAUTHORIZED });
      }
    }

    Card.updateMany(
      {},
      { $pull: { collections: Types.ObjectId(_id) } },
      (error) => {
        if (error) {
          return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: error.message });
        }
      }
    );

    await collection.remove();

    return res.status(httpStatus.OK).json({ message: COLLECTION.DELETED });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
