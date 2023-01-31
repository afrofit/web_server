import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getUser = async (req: Request, res: Response) => {
  logger(`getUser: ${JSON.stringify(req.params)}`);
  const userId = ObjectID(req.params.userId);

  try {
    const userRepo = AppDataSource.getMongoRepository(User);
    const results = await userRepo.findOneBy({
      where: { _id: userId },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get user", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your user.",
      data: {},
    });
  }
};
