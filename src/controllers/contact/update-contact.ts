import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';

import { AppDataSource } from '../../data-source';
import { logger } from '../../logger';
import { STATUS_CODES } from '../../types/status-codes';
import { Contact } from '../../entity/ContactUs';
import { createContactType } from './types/create-contact';

export const updateContact = async (req: Request, res: Response) => {
  logger(`updateContact: ${JSON.stringify(req.body)}`);

  const {
    name,
    number,
    isRegistered,
    moreInformation,
    productEnquiry,
    reason,
    createdAt,
    updatedAt,
    answer,
    status,
  }: createContactType = req.body;

  const contactId = ObjectID(req.params.contactId);

  try {
    const contactRepo = AppDataSource.getMongoRepository(Contact);
    const existingContact = await contactRepo.findOneBy({
      where: { _id: contactId },
    });

    if (!existingContact)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send('Contact does not exist');

    if (name) existingContact.name = name;
    if (number) existingContact.number = number;
    if (isRegistered) existingContact.isRegistered = isRegistered;
    if (moreInformation) existingContact.moreInformation = moreInformation;
    if (productEnquiry) existingContact.productEnquiry = productEnquiry;
    if (reason) existingContact.reason = reason;
    if (createdAt) existingContact.createdAt = createdAt;
    if (updatedAt) existingContact.updatedAt = updatedAt;
    if (answer) existingContact.answer = answer;
    if (status) existingContact.status = status;

    const results = await contactRepo.save(existingContact);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: 'Contact data updated', data: results });
  } catch (error) {
    console.error(error);
    return res.status(STATUS_CODES.INTERNAL_ERROR).send({
      message: 'An error occurred trying to update your contact.',
      data: {},
    });
  }
};
