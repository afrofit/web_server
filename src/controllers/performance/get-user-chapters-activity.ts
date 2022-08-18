import { PlayedChapter } from "./../../entity/PlayedChapter";
import { Request, Response } from "express";
import _ from "lodash";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";

const getUserChaptersActivity = async (req: Request, res: Response) => {
  const { userId, storyId, playedStoryId } = req.params;

  type ChapterPlayedType = {
    [key: string]: { userSteps: number; userTime: number };
  };

  try {
    const playedChaptersRepo = AppDataSource.getMongoRepository(PlayedChapter);

    let playedChapters = await playedChaptersRepo.find({
      where: { userId, storyId },
    });

    if (!playedChapters && !playedChapters.length) {
      return {} as ChapterPlayedType;
    }

    const mappedChapters = {} as ChapterPlayedType;

    console.log("mappedChapters", mappedChapters);

    playedChapters.map(
      (chapter) =>
        (mappedChapters[chapter.chapterId] = {
          userSteps: chapter.userSteps,
          userTime: chapter.userTime,
        })
    );

    return res.status(STATUS_CODES.CREATED).send({ chapters: mappedChapters });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getUserChaptersActivity;
