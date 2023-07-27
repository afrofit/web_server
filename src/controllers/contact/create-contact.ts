import { Request, Response } from 'express';
import { logger } from '../../logger';
import { createContactType } from './types/create-contact';
import { Contact } from '../../entity/ContactUs';
import { AppDataSource } from '../../data-source';
import { STATUS_CODES } from '../../types/status-codes';

export const createContact = async (req: Request, res: Response) => {
  logger(`createContact: ${JSON.stringify(req.body)}`);

  const {
    name,
    email,
    number,
    isRegistered,
    moreInformation,
    productEnquiry,
    reason,
  }: createContactType = req.body;

  try {
    const contactRepo = AppDataSource.getMongoRepository(Contact);

    const contactData: createContactType = new Contact();

    contactData.name = name;
    contactData.email = email;
    contactData.number = number;
    contactData.isRegistered = isRegistered;
    contactData.moreInformation = moreInformation;
    contactData.productEnquiry = productEnquiry;
    contactData.reason = reason;
    contactData.answer = '';
    contactData.status = 1;

    const results = await contactRepo.save(contactData);

    return res
      .status(STATUS_CODES.CREATED)
      .send({ message: 'Contact data inserted', data: results });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send('An error occured trying to create your contact.');
  }
};
