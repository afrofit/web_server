import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const signOut = async (req: Request, res: Response) => {
  logger("signOut", req.body);
  const { FCMToken } = req.body;
  const userId = ObjectID(req.body.userId);

  try {
    const userRepo = AppDataSource.getMongoRepository(User);

    const user = await userRepo.findOneBy({
      where: { _id: userId },
    });

    const index = user.FCMToken.findIndex((element) => element === FCMToken);

    user.FCMToken.splice(index, 1);
    await userRepo.save(user);

    return res.status(STATUS_CODES.CREATED).send({ message: "sign out user" });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your user.",
      data: {},
    });
  }
};
