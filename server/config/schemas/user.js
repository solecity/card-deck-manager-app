// libraries
import joi from "joi";

export const validateUser = (user) => {
  const schema = joi.object({
    username: joi.string().min(4).max(30).required(),
    name: joi.string().max(30).required(),
    password: joi
      .string()
      .min(4)
      .max(30)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    type: joi.number().min(1).max(2).required(),
    createdAt: joi.string()
  });

  return schema.validate(user);
};
