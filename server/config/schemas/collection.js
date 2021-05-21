// libraries
import joi from "joi";

export const validateCollection = (collection) => {
  const schema = joi.object({
    name: joi.string().max(30).required(),
    cards: joi.array().items(joi.string()),
    user: joi.string()
  });

  return schema.validate(collection);
};
