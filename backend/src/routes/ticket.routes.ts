import { consumeTicket, deleteTicket, getAllTickets, getOneTicket, getTicketIdentifier, orderTickets, updateTicket } from '@controllers/ticket.controllers';
import { isEventOwner } from '@utils/auth/isEventOwner';
import { isTicketOwner } from '@utils/auth/isTicketOwner';
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

// Generate Ticket Code (for use with QR)
router.get('/:ticketid/generate', isTicketOwner, getTicketIdentifier);

// Check-in Ticket (using generated code, normally stored in QR)
router.put('/:ticketid/consume', isEventOwner, consumeTicket)

export default router;