import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import { ObjectID } from "mongodb";

import { AppDataSource } from "../../data-source";
import { Shop } from "../../entity/Shop";
import { logger } from "../../logger";
import { STATUS_CODES } from "../../types/status-codes";
import { CreateShopType } from "./types/create-shop";

export const updateShop = async (req: Request, res: Response) => {
  logger(`updateShop: ${JSON.stringify(req.body)}`);

  const { files }: any = req;
  const { description, title, isHide }: CreateShopType = req.body;

  const shopId = ObjectID(req.params.shopId);

  try {
    const shopRepo = AppDataSource.getMongoRepository(Shop);

    const existingShop = await shopRepo.findOneBy({
      where: { _id: shopId },
    });

    if (!existingShop)
      return res.status(STATUS_CODES.BAD_REQUEST).send("Shop does not exist");

    if (title) existingShop.title = title;
    if (description) existingShop.description = description;
    if (isHide === "true") existingShop.isHide = true;
    if (isHide === "false") existingShop.isHide = false;

    for (const file of files) {
      const fileType = file.mimetype.split("/")[0];
      if (fileType === "image") {
        if (existsSync(`./public/${existingShop.imageUrl}`))
          unlinkSync(`./public/${existingShop.imageUrl}`);

        existingShop.imageUrl = file.filename;
      }

      if (fileType === "audio") {
        if (existsSync(`./public/${existingShop.audioUrl}`))
          unlinkSync(`./public/${existingShop.audioUrl}`);

        existingShop.audioUrl = file.filename;
      }
    }

    const results = await shopRepo.save(existingShop);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: "Shop data updated", data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: "An error occurred trying to update your shop.",
      data: {},
    });
  }
};
