import { Request, Response } from "express";
import webPush from "web-push";
import { Expo } from "expo-server-sdk";

import { logger } from "../../logger";
import { User } from "../../entity/User";
import { STATUS_CODES } from "../../types/status-codes";
import { AppDataSource } from "../../data-source";

const expo = new Expo();

webPush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);
export const createNotification = async (req: Request, res: Response) => {
  logger(`createNotification: ${JSON.stringify(req.body)}`);

  const { email: emails, text } = req.body;

  const pushTokens = [];
  const messages = [];

  try {
    const usersRepo = AppDataSource.getRepository(User);

    // Create a payload for the notification
    const payload = JSON.stringify({
      title: "Afrofit App",
      body: text,
    });

    for (const email of emails) {
      const { pushSubscription, FCMToken } = await usersRepo.findOne({
        where: { email },
      });

      // Send the notifications to all subscriptions in the array
      if (Object.entries(pushSubscription).length !== 0) {
        logger(`email: ${email} pushSubscription: ${pushSubscription}`);

        await webPush.sendNotification(pushSubscription, payload);
      }

      if (FCMToken.length) pushTokens.push(...FCMToken);
    }

    for (let pushToken of pushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: "default",
        title: "Afrofit App",
        body: text,
        data: { withSome: "data" },
      });
    }

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log("ticketChunk", ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Notification sent", result: { isSend: true } });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to create your notification.",
      data: {},
    });
  }
};
