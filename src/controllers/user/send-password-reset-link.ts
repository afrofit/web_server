import { Request, Response } from "express";
import _ from "lodash";
import { uuid } from "uuidv4";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { STATUS_CODES } from "../../types/status-codes";
import validateResetLink from "./validation/send-password-reset-link";
import { mailer } from "../../mailer";
import { logger } from "../../logger";

const sendPasswordResetLink = async (req: Request, res: Response) => {
  logger(`sendPasswordResetLink ReqBody: ${req.body}`);

  const { error } = validateResetLink(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { email } = req.body;

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);

    const existingUser = await usersRepo.findOneBy({ email });

    if (!existingUser)
      return res.status(STATUS_CODES.BAD_REQUEST).send("No such user");

    const hash = uuid();

    existingUser.password_reset_token = hash;
    await usersRepo.save(existingUser);

    const resetLink = `${process.env.CLIENT_URL}/set-new-password/${existingUser.id}/${hash}`;

    // Email this link
    logger(`resetLink: ${resetLink}`);

    // send mail
    const mailInfo = {
      to: existingUser.email,
      subject: `Your password reset link`,
      html: `<div><p>Hii ${existingUser.username}</p>
      <p>We're sending you this email because you requested a password reset. Click on this link to set a new password</p>
      <a href=${resetLink}>Set a new password</a>
      </div>`,
    };
    await mailer(mailInfo);

    return res
      .status(STATUS_CODES.OK)
      .send({ message: "Password reset mail sent", result: { isSend: true } });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create your account.");
  }
};

export default sendPasswordResetLink;
