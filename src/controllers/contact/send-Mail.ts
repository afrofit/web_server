import { Request, Response } from 'express';

import { STATUS_CODES } from '../../types/status-codes';
import { logger } from '../../logger';
import { createContactType } from './types/create-contact';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entity/ContactUs';
import { mailer } from '../../mailer';

export const sendMail = async (req: Request, res: Response) => {
  logger(`sendMail: ${JSON.stringify(req.body)}`);
  try {
    const { email, answer }: createContactType = req.body;

    const contactRepo = AppDataSource.getMongoRepository(Contact);
    const existingUser = await contactRepo.findOne({ where: { email } });

    if (!existingUser)
      return res.status(STATUS_CODES.BAD_REQUEST).send('User not found');

    // send mail
    const mailInfo = {
      to: existingUser.email,
      subject: `test`,
      html: answer,
    };

    const mail = await mailer(mailInfo);

    if (mail.accepted.length) {
      existingUser.status = 2;
      existingUser.answer = answer;
    }

    await contactRepo.save(existingUser);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: 'mail send successfully', data: existingUser });
  } catch (error) {
    console.error(`sendMail: ${error}`);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: 'An error occurred trying to send mail.',
      data: {},
    });
  }
};
