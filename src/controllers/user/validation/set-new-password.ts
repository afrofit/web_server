import Joi from "joi";

const validateSetNewPassword = (userData: {
  password: string;
  hash: string;
}) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6),
    hash: Joi.string().required().min(6),
  });

  return schema.validate(userData);
};

export default validateSetNewPassword;
