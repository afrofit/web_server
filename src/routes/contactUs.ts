import express from 'express';

import {
  getAllContact,
  getContactById,
  createContact,
  updateContact,
  sendMail,
} from '../controllers/contact';
import { isAdmin } from '../middleware';

const router = express.Router();

/**
 * Class  APIs
 * */

router.get('/', isAdmin, getAllContact);
router.get('/:contactId', isAdmin, getContactById);

router.post('/create', createContact);
router.post('/sendMail', sendMail);

router.put('/:contactId', updateContact);

export { router as contactRoutes };
