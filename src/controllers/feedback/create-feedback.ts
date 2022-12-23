import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "./../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { Feedback } from "../../entity/Feedback";

const createFeedback = async (req: Request, res: Response) => {
  try {
    const { description, title, name } = req.body;
    const imageUrl = req.file ? `image/${req.file.filename}` : "";

    const feedbacksRepo = AppDataSource.getMongoRepository(Feedback);

    const feedbackData = new Feedback();
    feedbackData.imageUrl = imageUrl;
    feedbackData.title = title;
    feedbackData.name = name;
    feedbackData.description = description;
    feedbackData.isHide = false;

    const results = await feedbacksRepo.save(feedbackData);

    return res.status(STATUS_CODES.CREATED).send(results);
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occurred trying to create your account.");
  }
};

export default createFeedback;
