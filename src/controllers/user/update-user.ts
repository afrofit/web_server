import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import argon2 from "argon2";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import { CreateUserRequestType } from "./types/create-user-request-type";
import { existsSync, unlinkSync } from "fs";
import { logger } from "../../logger";

export const updateUser = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    password,
    username,
    displayPicId,
    role,
    isBlock,
  }: CreateUserRequestType = req.body;

  const userId = ObjectID(req.params.userId);

  try {
    logger(`updateUser: ${JSON.stringify(req.body)}`);

    const usersRepo = AppDataSource.getMongoRepository(User);

    const existingUser = await usersRepo.findOneBy({
      where: { _id: userId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("There is a curious issue with your account");

    if (email) existingUser.email = email;
    if (firstName) existingUser.firstName = firstName;
    if (lastName) existingUser.lastName = lastName;
    if (username) existingUser.username = username;
    if (displayPicId) existingUser.displayPicId = displayPicId;
    if (role) existingUser.role = role;
    if (isBlock === "true") existingUser.isBlock = true;
    if (isBlock === "false") existingUser.isBlock = false;
    if (req.file) {
      if (existingUser.imageUrl) {
        if (existsSync(`./public/${existingUser.imageUrl}`))
          unlinkSync(`./public/${existingUser.imageUrl}`);
      }
      existingUser.imageUrl = req.file.filename;
    }
    if (password) {
      const hashedPassword = await argon2.hash(password);
      existingUser.password = hashedPassword;
    }

    const results = await usersRepo.save(existingUser);

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
