// libraries
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// utils
import { formatDate } from "../utils/date.js";

const { Schema } = mongoose;
const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  type: {
    type: Number,
    default: 2
  },
  createdAt: {
    type: String,
    default: formatDate(new Date())
  }
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  try {
    bcrypt.hash(this.password, saltRounds, (error, hash) => {
      if (error) {
        next(error);
      } else {
        this.password = hash;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
