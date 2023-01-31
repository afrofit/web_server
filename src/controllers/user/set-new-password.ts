import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { ObjectID } from "mongodb";
import { STATUS_CODES } from "../../types/status-codes";
import validateSetNewPassword from "./validation/set-new-password";
import { logger } from "../../logger";

const setNewPassword = async (req: Request, res: Response) => {
  const { error } = validateSetNewPassword(req.body);

  logger(`setNewPassword ReqBody: ${req.body}`);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { password, hash } = req.body;
  const { userId } = req.params;

  const formattedUserId = ObjectID(userId);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);

    const resettableUser = await usersRepo.findOneBy({
      password_reset_token: hash,
      _id: formattedUserId,
    });

    if (!resettableUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("There was a problem setting a new password.");
    }
    resettableUser.password = password;
    resettableUser.password_reset_token = null;

    await usersRepo.save(resettableUser);

    return res.status(STATUS_CODES.OK).send({
      message: "Your password are changed",
      result: { isUpdated: true },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to reset your password.");
  }
};

export default setNewPassword;
