import { Request, Response } from "express";
import { stripe } from "../../app";
import { STATUS_CODES } from "../../types/status-codes";
import validateCreateStripeSession from "./validation/create-stripe-session";

const createStripeSession = async (req: Request, res: Response) => {
  const { error } = validateCreateStripeSession(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const { userId } = req.params;
  const { email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      mode: "subscription",
      success_url:
        process.env.CLIENT_URL + "/payments/success?id={CHECKOUT_SESSION_ID}",
      cancel_url:
        process.env.CLIENT_URL + "/payments/cancel?id={CHECKOUT_SESSION_ID}",
      line_items: [
        {
          quantity: 1,
          price: process.env.PRODUCT_ID,
        },
      ],
    });
    return res.status(STATUS_CODES.CREATED).send({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create a stripe session.");
  }
};

export default createStripeSession;
