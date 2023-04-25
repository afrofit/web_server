import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { Event } from "../../entity/Event";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateEventType } from "./types/create-event";

export const createEvent = async (req: Request, res: Response) => {
  logger(`createEvent: ${JSON.stringify(req.body)}`);

  const { file }: any = req;
  const { description, title, paymentLinks, videoUrl }: CreateEventType =
    req.body;

  try {
    const eventRepo = AppDataSource.getMongoRepository(Event);

    const videoLink = videoUrl.split("/");

    const eventData = new Event();
    eventData.title = title;
    eventData.description = description;

    eventData.videoUrl = videoUrl;
    if (
      videoLink[2] === "drive.google.com" &&
      videoLink[videoLink.length - 1] === "view"
    )
      eventData.videoUrl = `https://drive.google.com/uc?id=${videoLink[5]}`;

    eventData.paymentLinks = paymentLinks ?? "";
    eventData.isHide = false;

    if (file) {
      const fileType = file.mimetype.split("/")[0];
      if (fileType === "image") {
        eventData.imageUrl = file.filename;
      }
    }

    // for (const file of files) {
    //   const fileType = file.mimetype.split("/")[0];
    //   if (fileType === "image") {
    //     eventData.imageUrl = file.filename;
    //   }

    //   if (fileType === "video") {
    //     eventData.videoUrl = file.filename;
    //   }
    // }

    const results = await eventRepo.save(eventData);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Event data inserted", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to create your event.",
      data: {},
    });
  }
};
