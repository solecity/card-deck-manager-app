// libraries
import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  collections: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
