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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
