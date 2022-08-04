import Joi from "joi";

const validateUpdateUserDp = (displayPicId: { displayPicId: number }) => {
  const schema = Joi.object({
    displayPicId: Joi.number().min(1).max(16),
  });

  return schema.validate(displayPicId);
};

export default validateUpdateUserDp;
