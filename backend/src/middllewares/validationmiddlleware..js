import ApiError from "../utils/apiError.js";

export const validateREquest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      throw new ApiError(400, "Error validate");
    }

    req.body = value;
    next();
  };
};
