import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Class } from "../../entity/Class";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateClassType } from "./types/create-class";

export const updateClass = async (req: Request, res: Response) => {
  logger(`updateClass: ${JSON.stringify(req.body)}`);

  const { file }: any = req;
  const { description, title, isHide, videoUrl }: CreateClassType = req.body;

  const classId = ObjectID(req.params.classId);

  try {
    const classRepo = AppDataSource.getMongoRepository(Class);

    const existingClass = await classRepo.findOneBy({
      where: { _id: classId },
    });

    if (!existingClass)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Class does not exist");

    if (title) existingClass.title = title;
    if (description) existingClass.description = description;

    existingClass.videoUrl = JSON.parse(videoUrl);

    if (isHide === "true") existingClass.isHide = true;
    if (isHide === "false") existingClass.isHide = false;

    if (file) {
      const fileType = file.mimetype.split("/")[0];
      if (fileType === "image") {
        if (existsSync(`./public/${existingClass.imageUrl}`))
          unlinkSync(`./public/${existingClass.imageUrl}`);

        existingClass.imageUrl = file.filename;
      }
    }

    const results = await classRepo.save(existingClass);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Class data updated", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to update your class.",
      data: {},
    });
  }
};
