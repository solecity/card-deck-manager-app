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
      type: Schema.Types.ObjectId,
      ref: "Card"
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Collection = mongoose.model("Collection", collectionchema);

export default Collection;
