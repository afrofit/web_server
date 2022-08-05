import { Response, Request, NextFunction } from "express";
import { STATUS_CODES } from "../types/status-codes";

const isCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser!)
    return res.status(STATUS_CODES.FORBIDDEN).send("Access forbidden.");
  next();
};

export default isCurrentUser;
