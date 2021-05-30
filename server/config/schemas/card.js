// libraries
import joi from "joi";

export const validateCard = (card) => {
  const schema = joi.object({
    name: joi.string().max(30).required(),
    description: joi.string().required(),
    value: joi.number().positive().required(),
    user: joi.string()
  });

  return schema.validate(card);
};
