import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Event } from "../../entity/Event";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const deleteEvent = async (req: Request, res: Response) => {
  logger(`deleteEvent: ${JSON.stringify(req.params)}`);
  const eventId = ObjectID(req.params.eventId);

  try {
    const eventRepo = AppDataSource.getMongoRepository(Event);

    const existingEvent = await eventRepo.findOneBy({
      where: { _id: eventId },
    });

    if (!existingEvent)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Event does not exist");

    existingEvent.isHide = true;
    await eventRepo.save(existingEvent);

    if (existingEvent.imageUrl) {
      if (existsSync(`./public/${existingEvent.imageUrl}`))
        unlinkSync(`./public/${existingEvent.imageUrl}`);
    }

    if (existingEvent.videoUrl) {
      if (existsSync(`./public/${existingEvent.videoUrl}`))
        unlinkSync(`./public/${existingEvent.videoUrl}`);
    }

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Event deleted", data: { isDeleted: true } });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to delete your event.",
      data: {},
    });
  }
};
