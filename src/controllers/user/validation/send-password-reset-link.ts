import Joi from "joi";

const validateResetLink = (userData: { email: string }) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });

  return schema.validate(userData);
};

export default validateResetLink;
