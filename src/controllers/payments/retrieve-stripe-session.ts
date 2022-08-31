import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { stripe } from "../../app";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { STATUS_CODES } from "../../types/status-codes";
import validateRetrieveStripeSession from "./validation/retrieve-stripe-session";

const retrieveStripeSession = async (req: Request, res: Response) => {
  const { error } = validateRetrieveStripeSession(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { userId } = req.params;
  const { sessionId } = req.body;

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

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("session", session);

    /** Now let's conditionally update the user's stripeCustomerId */
    if (
      !existingUser.stripeCustomerId ||
      !existingUser.lastActiveSubscriptionId
    ) {
      existingUser.stripeCustomerId = session.customer as string;
      existingUser.lastActiveSubscriptionId = session.subscription as string;
      await usersRepo.save(existingUser);
    }

    return res.status(STATUS_CODES.OK).send({ session });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to retrieve a stripe session.");
  }
};

export default retrieveStripeSession;
