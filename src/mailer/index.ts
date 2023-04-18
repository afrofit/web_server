import nodemailer from "nodemailer";
import { logger } from "../logger";

type mailType = {
  to: string | string[];
  subject: string;
  html: string;
};

// create transporter object with smtp server details
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailer = async ({ to, subject, html }: mailType) => {
  try {
    logger(`send mail`);

    const message = {
      from: `"Afrofit App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // send email
    const info = await transporter.sendMail(message);

    logger(`Message sent: %s ${info.messageId}`);
  } catch (error) {
    console.error(`error: ${error}`);
  }
};
