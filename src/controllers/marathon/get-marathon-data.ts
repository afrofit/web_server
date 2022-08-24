import { LeaderboardScore } from "./../../entity/LeaderboardScore";
import { Request, Response } from "express";
import _ from "lodash";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { createWeeklyLeaderboard } from "../functions/create-weekly-leaderboard";
import { Leaderboard } from "../../entity/Leaderboard";
import { User } from "../../entity/User";

const mockData = [
  { name: "GurgyWurgy", score: 9999 },
  { name: "ChinEye007", score: 9990 },
  { name: "RubeyRubey", score: 9980 },
  { name: "ScoobyDoo", score: 9970 },
  { name: "ScrappyDoo", score: 9960 },
  { name: "Paschalle", score: 9920 },
  { name: "Giannah_009", score: 9910 },
  { name: "Petreschu", score: 9900 },
  { name: "Pandlish", score: 9800 },
  { name: "Scarmonger_065", score: 8009 },
];

const getMarathonData = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log("userId", userId);

  const LOWER_LIMIT = 195;
  const formattedUserId = ObjectID(userId);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    const existingUser = await usersRepo.findOneBy({
      where: { _id: formattedUserId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("We can't quite retrieve your user details.");

    const leaderboardScoresRepo =
      AppDataSource.getMongoRepository(LeaderboardScore);
    const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

    const activeLeaderboard = await createWeeklyLeaderboard();

    if (!activeLeaderboard)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Error fetching leaderboard");

    // const formattedActiveLeaderboardId = ObjectID(activeLeaderboard.id);

    // const leaderboardScores = await leaderboardScoresRepo.find({
    //   order: { bodyMovements: "DESC" },
    //   skip: 0,
    //   take: LOWER_LIMIT,
    // });
    const leaderboardScores = await leaderboardScoresRepo.find({
      where: { leaderboardId: activeLeaderboard.id.toString() },
      order: { bodyMovements: "DESC" },
      skip: 0,
      take: LOWER_LIMIT,
    });

    console.log(
      "activeLeaderboard.id.toString",
      activeLeaderboard.id.toString()
    );

    console.log("leaderboardScores", leaderboardScores);

    let userLeaderboardScore = await leaderboardScoresRepo.findOne({
      where: {
        userId: userId,
        marathonId: activeLeaderboard.id,
      },
    });

    if (!userLeaderboardScore) {
      userLeaderboardScore = new LeaderboardScore();
      userLeaderboardScore.bodyMovements = 0;
      userLeaderboardScore.email = existingUser.email;
      userLeaderboardScore.leaderboardId = activeLeaderboard.id.toString();
      userLeaderboardScore.username = existingUser.username;
      userLeaderboardScore.userId = existingUser.id.toString();

      await leaderboardScoresRepo.save(userLeaderboardScore);
    }

    console.log(
      "userLeaderboardScore",
      userLeaderboardScore,
      "leaderboardScores",
      leaderboardScores.map((score) => {
        return {
          mvts: score.bodyMovements,
          leaderboardId: score.leaderboardId,
          username: score.username,
        };
      })
    );

    const transformedScores = leaderboardScores.map((score) => {
      return { name: score.username, score: score.bodyMovements };
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ marathon: transformedScores });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getMarathonData;
