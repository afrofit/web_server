import Joi from "joi";

const validateLoginUser = (userData: {
  email: string;
  password: string;
  pushSubscription: object;
}) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(255),
    pushSubscription: Joi.object().optional(),
  });

  return schema.validate(userData);
};

export default validateLoginUser;
