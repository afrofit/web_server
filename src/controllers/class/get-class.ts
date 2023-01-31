import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Class } from "../../entity/Class";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getClassById = async (req: Request, res: Response) => {
  logger(`getClassById: ${JSON.stringify(req.params)}`);
  const classId = ObjectID(req.params.classId);

  try {
    const classRepo = AppDataSource.getMongoRepository(Class);
    const results = await classRepo.findOneBy({
      where: { _id: classId },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get class", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your class.",
      data: {},
    });
  }
};
