import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Event } from "../../entity/Event";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getEventById = async (req: Request, res: Response) => {
  logger(`getEventById: ${JSON.stringify(req.params)}`);
  const eventId = ObjectID(req.params.eventId);

  try {
    const eventRepo = AppDataSource.getMongoRepository(Event);
    const results = await eventRepo.findOneBy({
      where: { _id: eventId },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get event", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your event.",
      data: {},
    });
  }
};
