import { LeaderboardScore } from "./../../entity/LeaderboardScore";
import { Request, Response } from "express";
import _ from "lodash";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { createWeeklyLeaderboard } from "../functions/create-weekly-leaderboard";
import { User } from "../../entity/User";

const getMarathonData = async (req: Request, res: Response) => {
  const { userId } = req.params;

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

    const activeLeaderboard = await createWeeklyLeaderboard();

    if (!activeLeaderboard)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Error fetching leaderboard");

    const leaderboardScores = await leaderboardScoresRepo.find({
      where: { leaderboardId: activeLeaderboard.id.toString() },
      order: { bodyMovements: "DESC" },
      skip: 0,
      take: LOWER_LIMIT,
    });

    console.log("leaderboardScores", leaderboardScores);

    let userLeaderboardScore = await leaderboardScoresRepo.findOne({
      where: {
        userId: userId,
        leaderboardId: activeLeaderboard.id.toString(),
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

    console.log("userLeaderboardScore", userLeaderboardScore);

    const transformedScores = leaderboardScores.map((score) => {
      return {
        name: score.username,
        userId: score.userId,
        score: score.bodyMovements,
      };
    });

    console.log("transformedScores", transformedScores);

    const transformedUserScore = {
      name: userLeaderboardScore.username,
      userId: userLeaderboardScore.userId,
      score: userLeaderboardScore.bodyMovements,
    };

    console.log("transformedUserScore", transformedUserScore);

    const userScoreIndex = transformedScores
      .map((score) => score.name)
      .indexOf(transformedUserScore.name);

    return res.status(STATUS_CODES.CREATED).send({
      marathon: transformedScores,
      userScore: transformedUserScore,
      userScoreIndex,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getMarathonData;
