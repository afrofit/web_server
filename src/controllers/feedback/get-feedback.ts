import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Feedback } from "../../entity/Feedback";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getFeedbackById = async (req: Request, res: Response) => {
  logger(`getFeedbackById: ${JSON.stringify(req.params)}`);
  const feedbackId = ObjectID(req.params.feedbackId);

  try {
    const feedbackRepo = AppDataSource.getMongoRepository(Feedback);
    const results = await feedbackRepo.findOneBy({
      where: { _id: feedbackId },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get feedback", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your feedback.",
      data: {},
    });
  }
};
