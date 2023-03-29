import { Request, Response } from "express";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import { logger } from "../../logger";

export const dynamicUpdate = async (req: Request, res: Response) => {
  try {
    logger("dynamicUpdate", JSON.stringify(req.body));

    const usersRepo = AppDataSource.getMongoRepository(User);

    const results = await usersRepo.updateMany({}, { $set: req.body });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "User updated", data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occurred trying to create your account.");
  }
};
