import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Event } from "../../entity/Event";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateEventType } from "./types/create-event";

export const updateEvent = async (req: Request, res: Response) => {
  logger(`updateEvent: ${JSON.stringify(req.body)}`);

  const { file }: any = req;
  const {
    description,
    title,
    paymentLinks,
    videoUrl,
    isHide,
  }: CreateEventType = req.body;

  const eventId = ObjectID(req.params.eventId);

  try {
    const eventRepo = AppDataSource.getMongoRepository(Event);

    const videoLink = videoUrl.split("/");
    console.log("videoLink", videoLink);

    const existingEvent = await eventRepo.findOneBy({
      where: { _id: eventId },
    });

    if (!existingEvent)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Event does not exist");

    if (title) existingEvent.title = title;
    if (description) existingEvent.description = description;
    if (paymentLinks) existingEvent.paymentLinks = paymentLinks;
    if (videoUrl) {
      existingEvent.videoUrl = videoUrl;

      if (
        videoLink[2] === "drive.google.com" &&
        videoLink[videoLink.length - 1] === "view"
      )
        existingEvent.videoUrl = `https://drive.google.com/uc?id=${videoLink[5]}`;
    }
    if (!paymentLinks) existingEvent.paymentLinks = "";
    if (isHide === "true") existingEvent.isHide = true;
    if (isHide === "false") existingEvent.isHide = false;

    if (file) {
      const fileType = file.mimetype.split("/")[0];
      if (fileType === "image") {
        if (existsSync(`./public/${existingEvent.imageUrl}`))
          unlinkSync(`./public/${existingEvent.imageUrl}`);

        existingEvent.imageUrl = file.filename;
      }
    }

    // for (const file of files) {
    //   const fileType = file.mimetype.split("/")[0];
    //   if (fileType === "image") {
    //     if (existsSync(`./public/${existingEvent.imageUrl}`))
    //       unlinkSync(`./public/${existingEvent.imageUrl}`);

    //     existingEvent.imageUrl = file.filename;
    //   }

    //   if (fileType === "video") {
    //     if (existsSync(`./public/${existingEvent.videoUrl}`))
    //       unlinkSync(`./public/${existingEvent.videoUrl}`);

    //     existingEvent.videoUrl = file.filename;
    //   }
    // }

    const results = await eventRepo.save(existingEvent);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Event data updated", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to update your event.",
      data: {},
    });
  }
};
