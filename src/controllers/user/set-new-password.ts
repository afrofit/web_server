import { Request, Response } from "express";
import argon2 from "argon2";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { ObjectID } from "mongodb";
import { nodeMailerTransporter } from "../../config";
import { STATUS_CODES } from "../../types/status-codes";
import validateSetNewPassword from "./validation/set-new-password";

const setNewPassword = async (req: Request, res: Response) => {
  const { error } = validateSetNewPassword(req.body);

  logger(`setNewPassword ReqBody: ${JSON.stringify(req.body)}`);

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

    resettableUser.password = await argon2.hash(password);
    resettableUser.password_reset_token = null;

    await usersRepo.save(resettableUser);

    const mailOptions = {
      from: `"Afrofit App" <${process.env.EMAIL_USER}>`, // sender address
      to: resettableUser.email,
      subject: "Welcome!",
      template: "password_changed",
      context: {
        name: resettableUser.username,
        adminEmail: process.env.AFROFIT_CONTACT_EMAIL,
      },
    };

    // trigger the sending of the E-mail
    nodeMailerTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
    });

    const token = resettableUser.generateToken();

    return res
      .status(STATUS_CODES.OK)
      .header(process.env.TOKEN_HEADER, token)
      .send({ token });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to reset your password.");
  }
};

export default setNewPassword;
