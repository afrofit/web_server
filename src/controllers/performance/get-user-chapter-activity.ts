import { Request, Response } from "express";
import _ from "lodash";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { PlayedChapter } from "../../entity/PlayedChapter";

const getUserChapterActivity = async (req: Request, res: Response) => {
  const { userId, storyId, chapterId } = req.params;

  try {
    const playedChapterRepo = AppDataSource.getMongoRepository(PlayedChapter);

    let playedChapter = await playedChapterRepo.findOne({
      where: { userId, storyId, chapterId },
    });

    if (!playedChapter) {
      playedChapter = new PlayedChapter();
      playedChapter.storyId = storyId;
      playedChapter.chapterId = chapterId;
      playedChapter.userId = userId;
      playedChapter.userSteps = 0;
      playedChapter.userTime = 0;

      await playedChapterRepo.save(playedChapter);
    }

    return res.status(STATUS_CODES.CREATED).send({ chapter: playedChapter });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getUserChapterActivity;
