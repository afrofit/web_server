import { isAfter, isBefore } from "date-fns";
import { AppDataSource } from "../../data-source";
import { Leaderboard } from "../../entity/Leaderboard";

const TODAY = new Date();

export const createWeeklyLeaderboard = async () => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  try {
    const existingLeaderboards = await leaderboardRepo.find({
      order: { createdAt: "DESC" },
    });

    if (existingLeaderboards.length > 0) {
      const existingLeaderboard = existingLeaderboards[0];
      console.log(
        typeof existingLeaderboard.createdAt,
        "existingLeaderboard.createdAt",
        existingLeaderboard.createdAt
      );
      if (
        isAfter(existingLeaderboard.endDate, TODAY) &&
        isBefore(existingLeaderboard.startDate, TODAY)
      ) {
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
