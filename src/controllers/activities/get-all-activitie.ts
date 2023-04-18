import { Request, Response } from "express";

import { STATUS_CODES } from "../../types/status-codes";
import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import { logger } from "../../logger";
import { chartDataType } from "./types/chart-data-type";

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    logger(`=========== getAllActivities ===========`);

    const usersRepo = AppDataSource.getMongoRepository(User);
    const users = await usersRepo.find({ where: { isDeleted: false } });

    const userCount = users.length;
    let subscribedUsersCount = 0;
    let blockUsersCount = 0;

    const chartData: chartDataType[] = [];
    const years: string[] = [];

    /* get users detail */
    for (const user of users) {
      const date = new Date(user.createdAt);
      const month = date.getMonth();
      const year = date.getFullYear().toString();

      if (!years.includes(year)) {
        years.push(year);
        chartData.push({
          year,
          data: [
            { name: "Users", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            {
              name: "Subscribe Users",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: "Block Users",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
        });
      }

      for (const element of chartData) {
        if (element.year === year) {
          /* count users month wise */
          element.data[0].data[month] += 1;

          /* count Subscribe users month wise */
          if (user.lastActiveSubscriptionId !== "") {
            subscribedUsersCount++;
            element.data[1].data[month] += 1;
          }
        }
      }

      if (user.isBlock === true) {
        const date = new Date(user.updatedAt);
        const month = date.getMonth();
        const year = date.getFullYear().toString();

        for (const element of chartData) {
          if (element.year === year) {
            blockUsersCount++;
            element.data[2].data[month] += 1;
          }
        }
      }
    }

    return res.status(STATUS_CODES.CREATED).send({
      message: "get all activities",
      data: {
        userCount,
        subscribedUsersCount,
        blockUsersCount,
        chartData,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occurred trying to create your account.");
  }
};
