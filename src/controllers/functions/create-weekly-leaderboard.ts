import { MoreThan, LessThan } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Leaderboard } from "../../entity/Leaderboard";

const TODAY = new Date();

export const createWeeklyLeaderboard = async () => {
  const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

  try {
    const existingLeaderboard = await leaderboardRepo.findOne({
      where: {
        endDate: MoreThan(TODAY),
        startDate: LessThan(TODAY),
      },
    });

    console.log("Existing Leaderboard", existingLeaderboard);
    if (existingLeaderboard) return existingLeaderboard;

    const leaderboard = new Leaderboard();
    await leaderboardRepo.save(leaderboard);

    if (!leaderboard) {
      throw new Error("Could not create a leaderboard!");
    }

    console.log("Leaderboard", leaderboard);
    return leaderboard;
  } catch (error) {
    console.error(error);
  }
};
