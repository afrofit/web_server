import { LeaderboardScore } from "./../../entity/LeaderboardScore";
import { Request, Response } from "express";
import _ from "lodash";
import { compareDesc } from "date-fns";
import { ObjectID } from "mongodb";

import { TodaysActivity } from "./../../entity/TodaysActivity";
import { Performance } from "./../../entity/Performance";
import { PlayedStory } from "./../../entity/PlayedStory";
import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { PlayedChapter } from "../../entity/PlayedChapter";
import { User } from "../../entity/User";
import { getActiveLeaderboard } from "../functions/get-active-leaderboard";

const CALORIE_MULTPLIER = 1.75;

const saveUserDanceActivity = async (req: Request, res: Response) => {
  const { userId, chapterId, playedStoryId } = req.params;

  const {
    timeDancedMS,
    userSteps,
    clampedUserSteps,
    chapterCompleted,
    storyCompleted,
  } = req.body.data;

  console.log("Params!", req.params);
  console.log("Body!", req.body);

  const formattedUserId = ObjectID(userId);
  const formattedPlayedStoryId = ObjectID(playedStoryId);

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    const existingUser = await usersRepo.findOneBy({
      where: { _id: formattedUserId },
    });

    if (!existingUser)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("We can't quite retrieve your user details.");

    const playedStoryRepo = AppDataSource.getMongoRepository(PlayedStory);
    const playedChapterRepo = AppDataSource.getMongoRepository(PlayedChapter);
    const performanceRepo = AppDataSource.getMongoRepository(Performance);
    const todaysActivityRepo = AppDataSource.getMongoRepository(TodaysActivity);
    const leaderboardScoreRepo =
      AppDataSource.getMongoRepository(LeaderboardScore);

    const todaysActivities = await todaysActivityRepo.find({
      where: { userId },
    });

    if (!todaysActivities || todaysActivities.length < 1) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your activities today doesn't exist.");
    }

    const todaysActivity = todaysActivities.sort((a, b) => {
      const previousDate = a.createdAt;
      const nextDate = b.createdAt;
      const result = compareDesc(new Date(previousDate), new Date(nextDate));
      return result;
    })[0];

    if (!todaysActivity) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your activity today doesn't exist.");
    }

    console.log("todaysActivity", todaysActivity);

    const playedChapter = await playedChapterRepo.findOne({
      where: { userId, chapterId },
    });

    if (!playedChapter) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your chapter activity data doesn't exist.");
    }

    const playedStory = await playedStoryRepo.findOneBy({
      where: { userId, _id: formattedPlayedStoryId },
    });

    if (!playedStory) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your story activity data doesn't exist.");
    }

    const performance = await performanceRepo.findOneBy({
      where: { userId },
    });

    if (!performance) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Oops! Your performance data doesn't exist.");
    }

    const activeLeaderboard = await getActiveLeaderboard();

    if (!activeLeaderboard) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Could not find an activeLeaderboard.");
    }

    const formattedLeaderboardId = ObjectID(activeLeaderboard.id);

    let userLeaderboardScore: LeaderboardScore;

    userLeaderboardScore = await leaderboardScoreRepo.findOne({
      where: { userId: "sadsfa", leaderboardId: formattedLeaderboardId },
    });

    if (!userLeaderboardScore) {
      console.log("We can't find an existing leaderboard score");
      userLeaderboardScore = new LeaderboardScore();
      userLeaderboardScore.email = existingUser.email;
      userLeaderboardScore.userId = existingUser.id.toString();
      userLeaderboardScore.username = existingUser.username;
      userLeaderboardScore.leaderboardId = activeLeaderboard.id.toString();
    }

    userLeaderboardScore.bodyMovements += userSteps;
    playedChapter.userTime += timeDancedMS;
    playedStory.userTime += timeDancedMS;
    performance.totalUserTime += timeDancedMS;

    performance.caloriesBurned += userSteps * CALORIE_MULTPLIER;
    todaysActivity.caloriesBurned += userSteps * CALORIE_MULTPLIER;

    todaysActivity.bodyMovements += userSteps;
    playedChapter.userSteps += clampedUserSteps;
    playedStory.userSteps += clampedUserSteps;
    performance.totalUserSteps += userSteps;

    // Check if the chapter is completed

    if (chapterCompleted) {
      playedStory.lastChapterCompleted += 1;
    }

    // Check if the story is completed

    let token: any = null;
    if (storyCompleted) {
      existingUser.lastStoryCompleted += 1;
      token = existingUser.generateToken();
    }

    await leaderboardScoreRepo.save(userLeaderboardScore);
    await playedStoryRepo.save(playedStory);
    await playedChapterRepo.save(playedChapter);
    await performanceRepo.save(performance);
    await todaysActivityRepo.save(todaysActivity);

    return res.status(STATUS_CODES.CREATED).send({
      chapter: playedChapter,
      story: playedStory,
      performance,
      today: todaysActivity,
      token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default saveUserDanceActivity;
