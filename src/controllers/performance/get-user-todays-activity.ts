import { Request, Response } from "express";
import _ from "lodash";
import { isToday } from "date-fns";

import { TodaysActivity } from "./../../entity/TodaysActivity";
import { STATUS_CODES } from "../../types/status-codes";
import { AppDataSource } from "../../data-source";
import { TodayActivityType } from "./types/today-activity-type";

const getUserTodaysActivity = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const todaysActivityRepo = AppDataSource.getMongoRepository(TodaysActivity);

    /**
     * Get all activities by user
     * Fetch the latest activity
     * if it's from today, return it
     * instead, create a new todaysactivity and return that instead
     */

    const existingActivities = await todaysActivityRepo.find({
      where: { userId: userId },
      order: {
        createdAt: "DESC",
      },
    });

    console.log("existingActivities", existingActivities);

    if (!existingActivities || !existingActivities.length)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your activity data doesn't exist.");

    const [existingActivity, ...others] = existingActivities;

    if (!existingActivity)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your daily activity data doesn't exist.");

    const isTodaysActivity = isToday(new Date(existingActivity.createdAt));

    let newTodayActivity: TodayActivityType | null;

    console.log("isTodaysActivity? ", isTodaysActivity);

    if (isTodaysActivity) {
      newTodayActivity = existingActivity;
    } else if (!isTodaysActivity) {
      newTodayActivity = new TodaysActivity();
      newTodayActivity.bodyMovements = 0;
      newTodayActivity.caloriesBurned = 0;
      newTodayActivity.userId = userId;

      await todaysActivityRepo.save(newTodayActivity);
    }

    const trimmedActivity = _.pick(newTodayActivity, [
      "bodyMovements",
      "caloriesBurned",
    ]);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ todaysActivity: trimmedActivity });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your daily activity data.");
  }
};

export default getUserTodaysActivity;
