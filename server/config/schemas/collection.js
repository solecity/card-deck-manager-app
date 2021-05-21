// libraries
import joi from "joi";

export const validateCollection = (collection) => {
  const schema = joi.object({
    name: joi.string().max(30).required(),
    cards: joi.array().items({
      _id: joi.string(),
      name: joi.string(),
      description: joi.string(),
      value: joi.number().min(1)
    }),
    user: joi.object({
      _id: joi.string(),
      username: joi.string()
    })
  });

  return schema.validate(collection);
};
