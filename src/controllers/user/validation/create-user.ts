import Joi from "joi";
import { CreateUserRequestType } from "../types/create-user-request-type";

const validateCreateUser = (userData: CreateUserRequestType) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(255),
    username: Joi.string().min(3).max(25),
    firstName: Joi.string().required().min(2).max(255),
    lastName: Joi.string().required().min(2).max(255),
    displayPicId: Joi.number().min(1).max(16),
    role: Joi.string().optional(),
  });

  return schema.validate(userData);
};

export default validateCreateUser;
