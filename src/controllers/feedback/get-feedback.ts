import { Request, Response } from "express";

import { AppDataSource } from "./../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { Feedback } from "../../entity/Feedback";

const getFeedback = async (req: Request, res: Response) => {
  try {
    const feedbacksRepo = AppDataSource.getMongoRepository(Feedback);

    const results = await feedbacksRepo.find({ where: { isHide: false } });

    return res.status(STATUS_CODES.CREATED).send(results);
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occurred trying to create your account.");
  }
};

export default getFeedback;
