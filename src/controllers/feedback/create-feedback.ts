import { Request, Response } from "express";

import { AppDataSource } from "./../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { Feedback } from "../../entity/Feedback";
import { validateCreateFeedback } from "./validation/validate-create-feedback";
import { CreateFeedbackType } from "./types/create-feedback";

const createFeedback = async (req: Request, res: Response) => {
  const { error } = validateCreateFeedback(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  try {
    const { description, title, name }: CreateFeedbackType = req.body;
    const imageUrl = req.file ? req.file.filename : "imageUrl";

    const feedbacksRepo = AppDataSource.getMongoRepository(Feedback);

    const feedbackData = new Feedback();
    feedbackData.imageUrl = imageUrl;
    feedbackData.title = title;
    feedbackData.name = name;
    feedbackData.description = description;
    feedbackData.isHide = false;

    const results = await feedbacksRepo.save(feedbackData);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Feedback data inserted", data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occurred trying to create your account.");
  }
};

export default createFeedback;
