import { Request, Response } from 'express';

import { AppDataSource } from '../../data-source';
import { Contact } from '../../entity/ContactUs';
import { logger } from '../../logger';
import { STATUS_CODES } from '../../types/status-codes';
import { createContactType } from './types/create-contact';

export const getAllContact = async (req: Request, res: Response) => {
  logger(`getAllClass: ${JSON.stringify(req.query)}`);

  const { productEnquiry }: createContactType = req.query;

  try {
    const where: any = {};
    if (productEnquiry) where.productEnquiry = productEnquiry;

    const contactRepo: any = AppDataSource.getMongoRepository(Contact);
    const results = await contactRepo.find({
      where,
      order: { isAnswer: 'ASC' },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: 'get all contacts', data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: 'An error occurred trying to get your contact.',
      data: [],
    });
  }
};
