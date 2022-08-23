import { MoreThan, LessThan } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Leaderboard } from "../../entity/Leaderboard";

const TODAY = new Date();

export const getActiveLeaderboard = async (): Promise<Leaderboard | null> => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  try {
    const weeklyLeaderboard = await leaderboardRepo.findOne({
      where: {
        endDate: MoreThan(TODAY),
        startDate: LessThan(TODAY),
      },
    });

    if (!weeklyLeaderboard) {
      throw new Error("Could not get this week's leaderboard!");
    }

    return weeklyLeaderboard;
  } catch (error) {
    console.error(error);
    return null;
  }
};
