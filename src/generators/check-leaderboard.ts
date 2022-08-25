import { AppDataSource } from "./../data-source";
import { createWeeklyLeaderboard } from "../controllers/functions/create-weekly-leaderboard";
import { Leaderboard } from "./../entity/Leaderboard";

export const checkLeaderboard = async () => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  const existingLeaderboards = await leaderboardRepo.find();

  if (!existingLeaderboards || existingLeaderboards.length < 1) {
    createWeeklyLeaderboard();
  }
};
