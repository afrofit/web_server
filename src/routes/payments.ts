import express from "express";
import {
  cancelUserSubscription,
  createStripeSession,
  retrieveStripeSession,
  retrieveUserSubscription,
} from "../controllers/payments";
import { isAuthenticated, isCurrentUser } from "../middleware";

const router = express.Router();

router.post(
  "/create-stripe-session/:userId",
  //   [isAuthenticated, isCurrentUser],
  createStripeSession
);
router.post(
  "/retrieve-stripe-session/:userId",
  //   [isAuthenticated, isCurrentUser],
  retrieveStripeSession
);
router.post(
  "/retrieve-user-subscription/:userId",
  //   [isAuthenticated, isCurrentUser],
  retrieveUserSubscription
);
router.post(
  "/cancel-user-subscription/:userId",
  //   [isAuthenticated, isCurrentUser],
  cancelUserSubscription
);

export { router as paymentRoutes };
