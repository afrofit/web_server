import { Request, Response } from "express";
import _ from "lodash";
import { ObjectID } from "mongodb";
import { unlinkSync, existsSync } from "fs";

import { AppDataSource } from "./../../data-source";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import validateUpdateUserDp from "./validation/update-user-dp";
import { logger } from "../../logger";

const updateUserDp = async (req: Request, res: Response) => {
  logger(`req.file: ${req.file}`);

  // const { error } = validateUpdateUserDp(req.body);

  // if (error)
  //   return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { userId } = req.params;

  
  
  const { displayPicId, isDevice }: { displayPicId: number, isDevice: string  } = req.body;

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
    if (displayPicId) {
      if (existingUser.imageUrl) {
        if (existsSync(`./public/${existingUser.imageUrl}`))
          unlinkSync(`./public/${existingUser.imageUrl}`);
      }
      existingUser.displayPicId = displayPicId;
      existingUser.imageUrl = "";
    }

    if (req.file) {
      if (existingUser.imageUrl) {
        if (existsSync(`./public/${existingUser.imageUrl}`))
          unlinkSync(`./public/${existingUser.imageUrl}`);
      }
      existingUser.imageUrl = req.file.filename;
      existingUser.displayPicId = 0;
    }

    const user = await usersRepo.save(existingUser);

    
    let token;

    // genrate device tokan
    if (isDevice) {
      token = existingUser.generateDeviceToken();
    } else {
      token =  existingUser.generateToken();
    }

    return res
      .status(STATUS_CODES.OK)
      .header(process.env.TOKEN_HEADER, token)
      .send({ data: user, token });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to update your DP.");
  }
};

export default updateUserDp;
