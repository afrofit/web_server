import { Request, Response } from "express";
import _ from "lodash";
import { uuid } from "uuidv4";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { STATUS_CODES } from "../../types/status-codes";
import validateResetLink from "./validation/send-password-reset-link";
import { nodeMailerTransporter } from "../../config";

const sendPasswordResetLink = async (req: Request, res: Response) => {
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
    console.log("resetLink", resetLink);

    const mailOptions = {
      from: `"Afrofit App" <${process.env.EMAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Welcome!",
      template: "password_reset", // the name of the template file i.e email.handlebars
      context: {
        name: existingUser.username, // replace {{name}} with Adebola
        resetLink: resetLink,
      },
    };

    // trigger the sending of the E-mail
    nodeMailerTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
    });

    return res.status(STATUS_CODES.OK).send({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create your account.");
  }
};

export default sendPasswordResetLink;
