import Joi from "joi";

const validateRetrieveStripeSession = (sessionId: string) => {
  const schema = Joi.object({
    sessionId: Joi.string().required(),
  });

  return schema.validate(sessionId);
};

export default validateRetrieveStripeSession;
