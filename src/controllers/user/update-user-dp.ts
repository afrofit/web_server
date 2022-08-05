import { Request, Response } from "express";
import _ from "lodash";
import { ObjectID } from "mongodb";

import { AppDataSource } from "./../../data-source";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import validateUpdateUserDp from "./validation/update-user-dp";

const updateUserDp = async (req: Request, res: Response) => {
  const { error } = validateUpdateUserDp(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { userId } = req.params;

  const { displayPicId }: { displayPicId: number } = req.body;

  const formattedUserId = ObjectID(userId);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    const existingUser = await usersRepo.findOneBy({
      where: { _id: formattedUserId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("There is a curious issue with your account");

    /** Now let's update a user */
    existingUser.displayPicId = displayPicId;

    await usersRepo.save(existingUser);

    const token = existingUser.generateToken();

    return res
      .status(STATUS_CODES.OK)
      .header(process.env.TOKEN_HEADER, token)
      .send({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to update your DP.");
  }
};

export default updateUserDp;
