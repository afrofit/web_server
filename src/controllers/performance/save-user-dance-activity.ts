import { Performance } from "./../../entity/Performance";
import { PlayedStory } from "./../../entity/PlayedStory";
import { Request, Response } from "express";
import _ from "lodash";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { PlayedChapter } from "../../entity/PlayedChapter";

const saveUserDanceActivity = async (req: Request, res: Response) => {
  const { userId, chapterId, playedStoryId } = req.params;

  const { timeDancedMS, userSteps, clampedUserSteps, chapterCompleted } =
    req.body.data;

  console.log("Params!", req.params);
  console.log("Body!", req.body);
  console.log(userId, chapterId, playedStoryId);

  const formattedUserId = ObjectID(userId);
  const formattedPlayedStoryId = ObjectID(playedStoryId);

  try {
    const playedStoryRepo = AppDataSource.getMongoRepository(PlayedStory);
    const playedChapterRepo = AppDataSource.getMongoRepository(PlayedChapter);
    const performanceRepo = AppDataSource.getMongoRepository(Performance);

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

    console.log(
      "playedChapter",
      playedChapter,
      "playedStory",
      playedStory,
      "performance",
      performance
    );

    playedChapter.userTime += timeDancedMS;
    playedStory.userTime += timeDancedMS;
    performance.totalUserTime += timeDancedMS;

    playedChapter.userSteps += clampedUserSteps;
    playedStory.userSteps += clampedUserSteps;
    performance.totalUserSteps += userSteps;

    // Check if the chapter is completed

    if (chapterCompleted) {
      playedStory.lastChapterCompleted += 1;
    }

    await playedStoryRepo.save(playedStory);
    await playedChapterRepo.save(playedChapter);
    await performanceRepo.save(performance);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ chapter: playedChapter, story: playedStory, performance });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default saveUserDanceActivity;
