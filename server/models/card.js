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
    default: 1
  },
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
