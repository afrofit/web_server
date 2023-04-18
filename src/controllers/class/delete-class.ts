import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Class } from "../../entity/Class";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const deleteClass = async (req: Request, res: Response) => {
  logger(`deleteClass: ${JSON.stringify(req.params)}`);
  const classId = ObjectID(req.params.classId);

  try {
    const classRepo = AppDataSource.getMongoRepository(Class);

    const existingClass = await classRepo.findOneBy({
      where: { _id: classId },
    });

    if (!existingClass)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Class does not exist");

    existingClass.isHide = true;
    await classRepo.save(existingClass);

    if (existingClass.imageUrl) {
      if (existsSync(`./public/${existingClass.imageUrl}`))
        unlinkSync(`./public/${existingClass.imageUrl}`);
    }

    if (existingClass.videoUrl) {
      if (existsSync(`./public/${existingClass.videoUrl}`))
        unlinkSync(`./public/${existingClass.videoUrl}`);
    }

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Class deleted", data: { isDeleted: true } });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to delete your class.",
      data: {},
    });
  }
};
