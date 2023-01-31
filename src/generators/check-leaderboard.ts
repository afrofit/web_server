import { AppDataSource } from "./../data-source";
import { createWeeklyLeaderboard } from "../controllers/functions/create-weekly-leaderboard";
import { Leaderboard } from "./../entity/Leaderboard";
import { logger } from "../logger";

export const checkLeaderboard = async () => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  const existingLeaderboards = await leaderboardRepo.find();

  if (!existingLeaderboards || existingLeaderboards.length < 1) {
    const leaderboard = await createWeeklyLeaderboard();

    logger(`leadboard: ${leaderboard}`);
  }
};
