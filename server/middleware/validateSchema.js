// libraries
import httpStatus from "http-status-codes";

export const validateSchema = (validator) => {
  return (req, res, next) => {
    try {
      const { error } = validator(req.body);

      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.message });
      }

      return next();
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  };
};
