import { isAfter, isBefore } from "date-fns";
import { AppDataSource } from "../../data-source";
import { Leaderboard } from "../../entity/Leaderboard";
import { logger } from "../../logger";

const TODAY = new Date();

export const createWeeklyLeaderboard = async () => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  try {
    const existingLeaderboards = await leaderboardRepo.find({
      order: { createdAt: "DESC" },
    });

    if (existingLeaderboards.length > 0) {
      const existingLeaderboard = existingLeaderboards[0];

      const condition =
        isAfter(existingLeaderboard.endDate, TODAY) &&
        isBefore(existingLeaderboard.startDate, TODAY);

      logger(`existingLeaderboard: ${existingLeaderboard}`);

      logger(`Leaderboard condition: ${condition}`);

      if (condition) {
        return existingLeaderboard;
      } else {
        const newLeaderboard = new Leaderboard();
        await leaderboardRepo.save(newLeaderboard);

        return newLeaderboard;
      }
    }

    const newLeaderboard = new Leaderboard();
    await leaderboardRepo.save(newLeaderboard);

    return newLeaderboard;
  } catch (error) {
    console.error(error);
  }
};
