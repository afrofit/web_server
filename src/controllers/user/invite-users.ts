import { Request, Response } from "express";
import _ from "lodash";

import { STATUS_CODES } from "../../types/status-codes";
import { mailer } from "../../mailer";
import { logger } from "../../logger";

export const inviteUsers = async (req: Request, res: Response) => {
  logger(`inviteUsers ReqBody: ${JSON.stringify(req.body)}`);

  const { email, subject, text } = req.body;

  try {
    const inviteLink = `${process.env.CLIENT_URL}`;

    logger(`inviteLink: ${inviteLink}`);

    // send mail

    const mailInfo = {
      to: email,
      subject: subject,
      html: text,
    };
    await mailer(mailInfo);

    return res
      .status(STATUS_CODES.OK)
      .send({ message: "Invite mail sent", result: { isSend: true } });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occurred trying to sent invite mail.");
  }
};
