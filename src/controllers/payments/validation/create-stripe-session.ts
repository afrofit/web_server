import Joi from "joi";

const validateCreateStripeSession = (email: string) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });

  return schema.validate(email);
};

export default validateCreateStripeSession;
