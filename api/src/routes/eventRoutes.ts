import express from 'express';
import {
  addEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from '../controllers/eventController';
import { eventValidationRules, validate } from '../validation';

const router = express.Router();

router.get('/', getEvents);
router.get('/:eventId', getEventById);
router.post('/', eventValidationRules, validate, addEvent);
router.put('/:eventId', eventValidationRules, validate, updateEvent);
router.delete('/:eventId', deleteEvent);

export default router;
