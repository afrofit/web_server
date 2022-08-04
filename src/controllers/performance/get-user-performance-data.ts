import { TodaysActivity } from "./../../entity/TodaysActivity";
import { ObjectID } from "mongodb";
import { Request, Response } from "express";
import _ from "lodash";
import { STATUS_CODES } from "../../types/status-codes";
import { AppDataSource } from "../../data-source";
import { Performance } from "../../entity/Performance";

const getUserPerformanceData = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const performanceRepo = AppDataSource.getMongoRepository(Performance);

    const existingPerformance = await performanceRepo.findOne({
      where: { userId: userId },
    });

    if (!existingPerformance)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your performance data doesn't exist.");

    const trimmedPerformance = _.pick(existingPerformance, [
      "totalUserSteps",
      "totalUserTime",
      "daysActive",
      "caloriesBurned",
    ]);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ performance: trimmedPerformance });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getUserPerformanceData;
