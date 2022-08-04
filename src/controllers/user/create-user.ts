import { AppDataSource } from "./../../data-source";
import { Request, Response } from "express";
import _ from "lodash";

import { STATUS_CODES } from "../../types/status-codes";
import validateCreateUser from "./validation/create-user";
import { User } from "../../entity/User";
import { CreateUserRequestType } from "./types/create-user-request-type";

const createUser = async (req: Request, res: Response) => {
  const { error } = validateCreateUser(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const {
    lastName,
    firstName,
    username,
    email,
    displayPicId,
    password,
  }: CreateUserRequestType = req.body;

  console.log("REQBODY", req.body);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    const existingUsername = await usersRepo.findOneBy({ username });

    if (existingUsername)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Username is already taken, try a unique one.");

    const existingUserEmail = await usersRepo.findOneBy({ email });

    if (existingUserEmail)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Email already exists, you can try logging with this email.");

    /** Now let's create a user */
    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;
    user.lastName = lastName;
    user.firstName = firstName;
    user.displayPicId = displayPicId;

    await usersRepo.save(user);

    const token = user.generateToken();

    const trimmedUser = _.pick(user, [
      "email",
      "firstName",
      "lastName",
      "username",
      "displayPicId",
    ]);

    return res
      .status(STATUS_CODES.CREATED)
      .header(process.env.TOKEN_HEADER, token)
      .send({ token, user: trimmedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create your account.");
  }
};

export default createUser;
