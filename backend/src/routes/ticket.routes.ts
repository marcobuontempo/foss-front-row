import { deleteTicket, getAllTickets, getOneTicket, orderTickets, updateTicket } from '@controllers/ticket.controllers';
import express from 'express';

const router = express.Router();

// Retrieve available tickets for a specific event
router.get('/', getAllTickets);

// Retrieve details of a specific ticket
router.get('/:ticketid', getOneTicket);

// Order tickets for a specific event (requires authentication)
router.post('/order', orderTickets);

// Update details of a specific ticket (requires authentication)
router.put('/:ticketid', updateTicket);

// Delete a specific ticket (requires authentication).
router.delete('/:ticketid', deleteTicket);

export default router;