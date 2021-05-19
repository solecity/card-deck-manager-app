// libraries
import httpStatus from "http-status-codes";

// model
import Collection from "../models/collection.js";

// constants
import { COLLECTION } from "../constants/messages.js";

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find();

    return res.status(httpStatus.OK).json(collections);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const collection = await Collection.findById(_id);

    if (!collection) {
      res.status(httpStatus.NOT_FOUND).json({ message: COLLECTION.NOT_FOUND });
    }

    return res.status(httpStatus.OK).json(collection);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};