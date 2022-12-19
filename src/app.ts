import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { STATUS_CODES } from "./types/status-codes";
import { userRoutes } from "./routes/user";
import { performanceRoutes } from "./routes/performance";
import { marathonRoutes } from "./routes/marathon";
import { paymentRoutes } from "./routes/payments";
import Stripe from "stripe";

/* App Setup */

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(logger("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cookieParser());

app.use(cors());

// for parsing multipart/form-data
app.use(express.static("public"));

/* Stripe Setup */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

/* Routes */

app.use("/api/users", userRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/marathon", marathonRoutes);
app.use("/api/payments", paymentRoutes);

/* Catch-Alls */

app.get("/api", (req: Request, res: Response) => {
  return res.send("Welcome to a Afrofit API.");
});

app.all("/*", async (req: Request, res: Response) => {
  return res
    .status(STATUS_CODES.BAD_REQUEST)
    .send("Sorry. Nothing lives here.");
});

export { app, stripe };
