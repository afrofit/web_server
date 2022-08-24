import { LeaderboardScore } from "../entity/LeaderboardScore";
import { AppDataSource } from "../data-source";
import { generateLeaderboardScores } from "./generate-leaderboard-scores";

export const seeder = async () => {
  const existingLeaderboardScoresRepo =
    AppDataSource.getMongoRepository(LeaderboardScore);

  const existingLeaderboardScores = await existingLeaderboardScoresRepo.find();

  if (!existingLeaderboardScores || !existingLeaderboardScores.length) {
    await generateLeaderboardScores();
  }
};
