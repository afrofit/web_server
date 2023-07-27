import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';

import { AppDataSource } from '../../data-source';
import { logger } from '../../logger';
import { STATUS_CODES } from '../../types/status-codes';
import { Contact } from '../../entity/ContactUs';

export const getContactById = async (req: Request, res: Response) => {
  logger(`getContactById: ${JSON.stringify(req.params)}`);
  const contactId = ObjectID(req.params.contactId);

  try {
    const classRepo = AppDataSource.getMongoRepository(Contact);
    const results = await classRepo.findOneBy({
      where: { _id: contactId },
    });

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: 'get contact', data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: 'An error occurred trying to get your contact.',
      data: {},
    });
  }
};
