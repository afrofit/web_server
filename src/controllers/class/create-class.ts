import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { Class } from "../../entity/Class";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateClassType } from "./types/create-class";

export const createClass = async (req: Request, res: Response) => {
  logger(`createClass: ${JSON.stringify(req.body)}`);

  const { file }: any = req;
  const { description, title, videoUrl }: CreateClassType = req.body;

  try {
    const classRepo = AppDataSource.getMongoRepository(Class);

    const classData = new Class();

    classData.title = title;
    classData.description = description;

    if (videoUrl) {
      const videoLink = videoUrl.split("/");

      classData.videoUrl = videoUrl;

      if (videoLink[2] === "youtu.be") {
        classData.videoUrl = videoLink[3];
      }
    }

    classData.isHide = false;

    if (file) {
      const fileType = file.mimetype.split("/")[0];
      if (fileType === "image") {
        classData.imageUrl = file.filename;
      }
    }

    const results = await classRepo.save(classData);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Class data inserted", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to create your class.",
      data: {},
    });
  }
};
