import { isAfter, isBefore } from "date-fns";

import { AppDataSource } from "../../data-source";
import { Leaderboard } from "../../entity/Leaderboard";
import { logger } from "../../logger";

const TODAY = new Date();

export const getActiveLeaderboard = async (): Promise<Leaderboard | null> => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  try {
    const existingLeaderboards = await leaderboardRepo.find({
      order: { createdAt: "DESC" },
    });

    if (existingLeaderboards.length > 0) {
      const weeklyLeaderboard = existingLeaderboards[0];
      logger(
        `${typeof weeklyLeaderboard.createdAt}
        weeklyLeaderboard.createdAt
        ${weeklyLeaderboard.createdAt}`
      );

      if (
        isAfter(weeklyLeaderboard.endDate, TODAY) &&
        isBefore(weeklyLeaderboard.startDate, TODAY)
      ) {
        return weeklyLeaderboard;
      } else {
        const newLeaderboard = new Leaderboard();
        await leaderboardRepo.save(newLeaderboard);

        return newLeaderboard;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
