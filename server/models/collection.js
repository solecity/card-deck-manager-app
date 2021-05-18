// libraries
import mongoose from "mongoose";

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cards: [
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
