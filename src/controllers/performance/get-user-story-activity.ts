import { Request, Response } from "express";
import _ from "lodash";

import { AppDataSource } from "../../data-source";
import { PlayedStory } from "./../../entity/PlayedStory";
import { STATUS_CODES } from "../../types/status-codes";

const getUserStoryActivity = async (req: Request, res: Response) => {
  const { userId, storyId } = req.params;

  try {
    const playedStoryRepo = AppDataSource.getMongoRepository(PlayedStory);

    let playedStory = await playedStoryRepo.findOne({
      where: { userId, storyId },
    });

    if (!playedStory) {
      playedStory = new PlayedStory();
      playedStory.storyId = storyId;
      playedStory.userId = userId;
      playedStory.userSteps = 0;
      playedStory.userTime = 0;
      playedStory.lastChapterCompleted = 1;

      await playedStoryRepo.save(playedStory);
    }

    return res.status(STATUS_CODES.CREATED).send({ playedStory });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getUserStoryActivity;
