import { createNewEvent, deleteEvent, getAllEvents, getOneEvent, getUserEvents, updateEvent } from '@controllers/event.controllers';
import { isCurrentAuthUser } from '@utils/auth/isCurrentAuthUser';
import { isEventOwner } from '@utils/auth/isEventOwner';
import express from 'express';

const router = express.Router({ mergeParams: true });

// Retrieve a list of events
router.get('/', getAllEvents);

// Retrieve details of a specific event
router.get('/:eventid', getOneEvent);

// Retrieve a list of a specific user's events (requires authentication)
router.get('/user/:userid', isCurrentAuthUser, getUserEvents);

// Create a new event (requires authentication)
router.post('/', createNewEvent);

// Update details of a specific event (requires authentication)
router.put('/:eventid', isEventOwner, updateEvent);

// Delete a specific event (requires authentication)
router.delete('/:eventid', isEventOwner, deleteEvent);

export default router;