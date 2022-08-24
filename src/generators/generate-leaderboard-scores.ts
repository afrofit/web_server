import { AppDataSource } from "../data-source";
import { Leaderboard } from "../entity/Leaderboard";
import { LeaderboardScore } from "./../entity/LeaderboardScore";

const scores = [100, 99, 98, 97, 94, 92, 90, 87, 76, 65, 64, 63, 59, 55, 41];

const names = [
  "Jayke",
  "Jaymie",
  "Jayse",
  "Jayson",
  "Jaz",
  "Jeevan",
  "Jeffrey",
  "Jensen",
  "Jody",
  "Joe",
  "Joeddy",
  "Joel",
  "Joey",
  "Joey-Jack",
  "Johann",
  "Johannes",
  "Johansson",
  "John",
  "Johnathan",
  "Johndean",
  "Johnjay",
  "John-Michael",
  "Johnnie",
  "Johnny",
  "Johnpaul",
  "John-Paul",
  "Jon-Paul",
  "Jonson",
  "Joojo",
  "Jordan",
  "Jordi",
  "Jordon",
  "Jordy",
  "Kaison",
  "Kaiwen",
  "Kajally",
  "Kajetan",
];

const LEADERBOARD_ID = "63067992dd3035ba4c2b54af";
const USER_ID = "62ed06d20f10cb398dfdb754";

const randomNumber = (min: number = 0, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const existingLeaderboardScoresRepo =
  AppDataSource.getMongoRepository(LeaderboardScore);

const existingLeaderboardsRepo = AppDataSource.getMongoRepository(Leaderboard);

export const generateLeaderboardScores = async () => {
  const existingLeaderboards = await existingLeaderboardsRepo.find({
    order: { createdAt: "DESC" },
    skip: 0,
  });

  const existingLeaderboard = existingLeaderboards[0];

  if (!existingLeaderboard) throw new Error("No leaderboard to reference!");

  await Promise.all(
    scores.map(async (score, index: number) => {
      const newScore = new LeaderboardScore();
      newScore.bodyMovements = score;
      (newScore.email = "random.email@email.com"),
        (newScore.leaderboardId =
          existingLeaderboard.id.toString() ?? LEADERBOARD_ID),
        (newScore.userId = USER_ID),
        (newScore.username = names[randomNumber(0, names.length)]);

      await existingLeaderboardScoresRepo.save(newScore);
    })
  );
  console.log("Done seeding leaderboard scores...");
};
