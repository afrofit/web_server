import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Feedback } from "../../entity/Feedback";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateFeedbackType } from "./types/create-feedback";

export const updateFeedback = async (req: Request, res: Response) => {
  logger(`updateFeedback: ${JSON.stringify(req.body)}`);

  const { description, title, isHide, name }: CreateFeedbackType = req.body;

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

    if (title) existingFeedback.title = title;
    if (name) existingFeedback.name = name;
    if (description) existingFeedback.description = description;
    if (isHide === "true") existingFeedback.isHide = true;
    if (isHide === "false") existingFeedback.isHide = false;

    if (req.file) {
      if (existsSync(`./public/${existingFeedback.imageUrl}`))
        unlinkSync(`./public/${existingFeedback.imageUrl}`);

      existingFeedback.imageUrl = req.file.filename;
    }

    const results = await feedbackRepo.save(existingFeedback);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Feedback data updated", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to update your Feedback.",
      data: {},
    });
  }
};
