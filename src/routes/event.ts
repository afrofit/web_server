import express from 'express';

import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getEventById,
  updateEvent,
} from '../controllers/event';
import { fileUpload, isAdmin, isAuthenticated } from '../middleware';

const router = express.Router();

/**
 * Event  APIs
 * */

router.get('/', getAllEvent);

router.get('/:eventId', getEventById);

router.post('/create', isAdmin, fileUpload.single('file'), createEvent);

router.put('/:eventId', isAdmin, fileUpload.single('file'), updateEvent);

router.delete('/:eventId', isAdmin, deleteEvent);

export { router as eventRoutes };
