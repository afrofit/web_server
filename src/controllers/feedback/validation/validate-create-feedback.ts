import Joi from "joi";
import { CreateFeedbackType } from "../types/create-feedback";

export const validateCreateFeedback = (data: CreateFeedbackType) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    title: Joi.string().required(),
    name: Joi.string().required(),
  });

  return schema.validate(data);
};
