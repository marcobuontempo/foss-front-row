import { createNewEvent, deleteEvent, getAllEvents, getOneEvent, updateEvent } from '@controllers/event.controllers';
import express from 'express';

const router = express.Router();

// Retrieve a list of events
router.get('/', getAllEvents);

// Retrieve details of a specific event
router.get('/:eventid', getOneEvent);

// Create a new event (requires authentication)
router.post('/', createNewEvent);

// Update details of a specific event (requires authentication)
router.put('/:eventid', updateEvent);

// Delete a specific event (requires authentication)
router.delete('/:eventid', deleteEvent);

export default router;