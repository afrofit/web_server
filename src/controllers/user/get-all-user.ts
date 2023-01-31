import { Request, Response } from "express";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";

export const getAllUser = async (req: Request, res: Response) => {
  //   const { role } = req.currentUser;
  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    // const results = await usersRepo.find({ where: { isDeleted: false } });
    const results = await usersRepo.find();

    await usersRepo.update(
      {},
      { isBlock: false, isDeleted: false, role: "user" }
    );

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get all users", data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create your account.");
  }
};
