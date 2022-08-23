import { LeaderboardScore } from "./../../entity/LeaderboardScore";
import { Request, Response } from "express";
import _ from "lodash";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { PlayedChapter } from "../../entity/PlayedChapter";
import { createWeeklyLeaderboard } from "../functions/create-weekly-leaderboard";
import { Leaderboard } from "../../entity/Leaderboard";

const mockData = [
  { name: "GurgyWurgy", score: 10000 },
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

  const LOWER_LIMIT = 195;

  try {
    const leaderboardScoresRepo =
      AppDataSource.getMongoRepository(LeaderboardScore);
    const leaderboardRepo = AppDataSource.getMongoRepository(Leaderboard);

    const activeLeaderboard = await createWeeklyLeaderboard();

    if (!activeLeaderboard)
      return res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .send("Error fetching leaderboard");

    const leaderboardScores = await leaderboardScoresRepo.find({
      where: { leaderboardId: activeLeaderboard.id },
      order: { bodyMovements: "DESC" },
      skip: 0,
      take: LOWER_LIMIT,
    });

    if (!leaderboardScores || !leaderboardScores.length)
      return res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .send("Sorry. Cannot find marathon data.");

    const currentUserLeaderboardScore = await leaderboardScoresRepo.findOne({
      where: {
        userId: userId,
        marathonId: activeLeaderboard.id,
      },
    });

    if (!currentUserLeaderboardScore) {
      return res
        .status(STATUS_CODES.INTERNAL_ERROR)
        .send("There was an error getting marathon data for user.");
    }

    console.log("Datarrr", currentUserLeaderboardScore, leaderboardScores);

    return res.status(STATUS_CODES.CREATED).send({ marathon: mockData });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getMarathonData;
