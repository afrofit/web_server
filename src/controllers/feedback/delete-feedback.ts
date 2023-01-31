import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Feedback } from "../../entity/Feedback";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const deleteFeedback = async (req: Request, res: Response) => {
  logger(`deleteFeedback: ${JSON.stringify(req.params)}`);
  const feedbackId = ObjectID(req.params.feedbackId);

  try {
    const feedbackRepo = AppDataSource.getMongoRepository(Feedback);

    const existingFeedback = await feedbackRepo.findOneBy({
      where: { _id: feedbackId },
    });

    if (!existingFeedback)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Feedback does not exist");

    existingFeedback.isHide = true;
    await feedbackRepo.save(existingFeedback);

    if (existingFeedback.imageUrl) {
      if (existsSync(`./public/${existingFeedback.imageUrl}`))
        unlinkSync(`./public/${existingFeedback.imageUrl}`);
    }

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Feedback deleted", data: { isDeleted: true } });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to delete your feedback.",
      data: {},
    });
  }
};
