import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { Shop } from "../../entity/Shop";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateShopType } from "./types/create-shop";

export const createShop = async (req: Request, res: Response) => {
  logger(`createShop: ${JSON.stringify(req.body)}`);

  const { files }: any = req;

  const { description, title }: CreateShopType = req.body;

  try {
    const shopRepo = AppDataSource.getMongoRepository(Shop);

    const shopData = new Shop();
    shopData.title = title;
    shopData.description = description;
    shopData.isHide = false;

    for (const file of files) {
      const fileType = file.mimetype.split("/")[0];
      if (fileType === "image") {
        shopData.imageUrl = file.filename;
      }

      if (fileType === "audio") {
        shopData.audioUrl = file.filename;
      }
    }

    const results = await shopRepo.save(shopData);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Shop data inserted", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to create your shop.",
      data: {},
    });
  }
};
