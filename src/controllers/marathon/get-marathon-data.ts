import { Request, Response } from "express";
import _ from "lodash";

import { AppDataSource } from "../../data-source";
import { STATUS_CODES } from "../../types/status-codes";
import { PlayedChapter } from "../../entity/PlayedChapter";

const getMarathonData = async (req: Request, res: Response) => {
  const { userId } = req.params;

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

  try {
    return res.status(STATUS_CODES.CREATED).send({ marathon: mockData });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to fetch your performance data.");
  }
};

export default getMarathonData;
