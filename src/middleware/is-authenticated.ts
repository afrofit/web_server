import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../types/status-codes";

export interface UserPayload {
  id: string;
  email: string;
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header(process.env.TOKEN_HEADER);
  if (!token)
    return res.status(STATUS_CODES.UNAUTHORIZED).send("Provide a valid token.");

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET!
    ) as UserPayload;
    req.currentUser = decoded;
    next();
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).send("Invalid token provided.");
  }
};

export default isAuthenticated;
