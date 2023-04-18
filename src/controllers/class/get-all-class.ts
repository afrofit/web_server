import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { Class } from "../../entity/Class";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getAllClass = async (req: Request, res: Response) => {
  logger(`============getAllClass================`);

  try {
    const classRepo = AppDataSource.getMongoRepository(Class);
    const results = await classRepo.find({ where: { isHide: false } });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get all classes", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your class.",
      data: [],
    });
  }
};
