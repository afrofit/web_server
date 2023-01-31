import argon2 from "argon2";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import validateLoginUser from "./validation/login-user";

const loginUser = async (req: Request, res: Response) => {
  const { error } = validateLoginUser(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { email, password, pushSubscription } = req.body;

  logger(`REQBODY: ${req.body}`);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);

    const user = await usersRepo.findOneBy({ email });
    if (!user)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Wrong Email/Password");

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Wrong Email/Password");

    if (user.isBlock)
      return res.status(STATUS_CODES.BAD_REQUEST).send("User is block");

    if (pushSubscription) {
      user.pushSubscription = pushSubscription;
      await usersRepo.save(user);
    }

    /** Let's log user in now */
    const token = user.generateToken();

    return res
      .status(STATUS_CODES.OK)
      .header(process.env.TOKEN_HEADER, token)
      .send({ token, data: user });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to log you into your account.");
  }
};

export default loginUser;
