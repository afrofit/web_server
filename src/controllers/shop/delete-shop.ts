import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Shop } from "../../entity/Shop";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";

export const deleteShop = async (req: Request, res: Response) => {
  logger(`deleteShop: ${JSON.stringify(req.params)}`);
  const shopId = ObjectID(req.params.shopId);

  try {
    const shopRepo = AppDataSource.getMongoRepository(Shop);

    const existingShop = await shopRepo.findOneBy({
      where: { _id: shopId },
    });

    if (!existingShop)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Shop does not exist");

    existingShop.isHide = true;
    await shopRepo.save(existingShop);

    if (existingShop.imageUrl) {
      if (existsSync(`./public/${existingShop.imageUrl}`))
        unlinkSync(`./public/${existingShop.imageUrl}`);
    }

    if (existingShop.audioUrl) {
      if (existsSync(`./public/${existingShop.audioUrl}`))
        unlinkSync(`./public/${existingShop.audioUrl}`);
    }

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Shop deleted", data: { isDeleted: true } });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to delete your shop.",
      data: {},
    });
  }
};
