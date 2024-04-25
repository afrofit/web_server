import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';

import { stripe } from '../../app';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { STATUS_CODES } from '../../types/status-codes';
import validateCreateStripeSession from './validation/create-stripe-session';

const createStripeSession = async (req: Request, res: Response) => {
  const { error } = validateCreateStripeSession(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { userId } = req.params;
  const { priceId, email } = req.body;

  const formattedUserId = ObjectID(userId);

  try {
    /** First we must find a user */
    const usersRepo = AppDataSource.getMongoRepository(User);

    const existingUser = await usersRepo.findOneBy({
      where: { _id: formattedUserId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("We can't quite find your user details.");

    if (!existingUser.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email,
      });

      existingUser.stripeCustomerId = customer.id;
    }

    const data: any = {
      // customer: existingUser.stripeCustomerId,
      customer: 'cus_PzLKsHLalD7zwy',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price: 'price_1MEvHYSDRiBpbKJAcRIoBWEn',
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: process.env.TRIAL_DAYS,
      },
      success_url: `${process.env.CLIENT_URL}/about?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/plan?id={CHECKOUT_SESSION_ID}`,
    };

    const session = await stripe.checkout.sessions.create(data);

    //return res.status(STATUS_CODES.CREATED).send({ sessionId: session.id });

    return res.status(200).json({
      success: true,
      message: 'Shopify session successfully created!',
      sessionId: session.id,
      key: `${process.env.STRIPE_SECRET_KEY}`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: 'Something went wrong!!!',
      message: error.message,
      key: `${process.env.STRIPE_SECRET_KEY}`,
    });

    // return res.status(STATUS_CODES.INTERNAL_ERROR).send({
    //   message: error.message,
    //   error: 'An error occurred trying to create a stripe session.',
    // });
  }
};

export default createStripeSession;
