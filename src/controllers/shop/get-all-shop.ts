import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { Shop } from "../../entity/Shop";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getAllShop = async (req: Request, res: Response) => {
  logger(`============getAllShop================`);

  try {
    const shopRepo = AppDataSource.getMongoRepository(Shop);
    const results = await shopRepo.find({ where: { isHide: false } });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get all shops", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your shops.",
      data: [],
    });
  }
};
