import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { stripe } from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { STATUS_CODES } from "../../types/status-codes";

const retrieveUserSubscription = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const formattedUserId = ObjectID(userId);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);

    const existingUser = await usersRepo.findOneBy({
      where: { _id: formattedUserId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("We can't quite retrieve your user details.");

    if (!existingUser.lastActiveSubscriptionId)
      return res.status(STATUS_CODES.OK).send({ activeSubscription: false });

    const subscription = await stripe.subscriptions.retrieve(
      existingUser.lastActiveSubscriptionId
    );

    let isActive = false;

    if (
      subscription.status === "active" ||
      subscription.status === "trialing"
    ) {
      isActive = true;
    }

    const endDate = new Date(subscription.current_period_end * 1000);
    return res
      .status(STATUS_CODES.OK)
      .send({ activesSubscription: isActive, endDate });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to retrieve a stripe session.");
  }
};

export default retrieveUserSubscription;
