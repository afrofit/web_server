import { Request, Response } from "express";
import _ from "lodash";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";

const getUserSubscription = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const formattedUserId = ObjectID(userId);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    const existingUser = await usersRepo.findOneBy({
      where: { _id: formattedUserId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("We can't quite retrieve your user details.");

    const isSubscribed = true; // or false

    return res.status(STATUS_CODES.CREATED).send({ isSubscribed });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getUserSubscription;
