import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import { logger } from "../../logger";

export const deleteUser = async (req: Request, res: Response) => {
  const userId = ObjectID(req.params.userId);
  try {
    logger(`deleteUser: ${req.params}`);

    const usersRepo = AppDataSource.getMongoRepository(User);

    const existingUser = await usersRepo.findOneBy({
      where: { _id: userId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("There is a curious issue with your account");

    existingUser.isDeleted = true;

    await usersRepo.save(existingUser);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "User deleted", data: { isDeleted: true } });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create your account.");
  }
};
