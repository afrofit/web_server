import { Request, Response } from "express";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Shop } from "../../entity/Shop";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const getShopById = async (req: Request, res: Response) => {
  logger(`getShopById: ${JSON.stringify(req.params)}`);
  const shopId = ObjectID(req.params.shopId);

  try {
    const shopRepo = AppDataSource.getMongoRepository(Shop);
    const results = await shopRepo.findOneBy({
      where: { _id: shopId },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "get shop", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to get your shop.",
      data: {},
    });
  }
};
