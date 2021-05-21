// libraries
import mongoose from "mongoose";

const { Schema } = mongoose;

const collectionchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cards: [
    {
      _id: Schema.Types.ObjectId,
      name: String,
      description: String,
      value: Number
    }
  ],
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

const Collection = mongoose.model("Collection", collectionchema);

export default Collection;
