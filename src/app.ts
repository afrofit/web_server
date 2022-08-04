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

/* App Setup */

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());

app.use(cors());

/* Routes */

app.use("/users", userRoutes);
app.use("/performance", performanceRoutes);
app.use("/marathon", marathonRoutes);

/* Catch-Alls */

app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to a Afrofit API.");
});

app.all("*", async (req: Request, res: Response) => {
  return res
    .status(STATUS_CODES.BAD_REQUEST)
    .send("Sorry. Nothing lives here.");
});

export { app };
