import { deleteTicket, getAllTickets, getOneTicket, orderTickets, updateTicket } from '@controllers/ticket.controllers';
import { isEventOwner } from '@utils/auth/isEventOwner';
import express from 'express';

const router = express.Router({ mergeParams: true });

// Retrieve available tickets for a specific event
router.get('/', getAllTickets);

// Retrieve details of a specific ticket
router.get('/:ticketid', getOneTicket);

// Order tickets for a specific event (requires authentication)
router.post('/order', orderTickets);

// Update details of a specific ticket (requires authentication)
router.put('/:ticketid', isEventOwner, updateTicket);

// Delete a specific ticket (requires authentication).
router.delete('/:ticketid', isEventOwner, deleteTicket);

export default router;