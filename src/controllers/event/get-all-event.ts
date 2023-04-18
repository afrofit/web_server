import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { Event } from "../../entity/Event";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getAllEvent = async (req: Request, res: Response) => {
  logger(`============getAllEvent================`);

  try {
    const eventRepo = AppDataSource.getMongoRepository(Event);
    const results = await eventRepo.find({ where: { isHide: false } });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get all events", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your event.",
      data: [],
    });
  }
};
