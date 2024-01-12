import { IEvent } from "@models/Event.model";
import Ticket, { ITicket } from "@models/Ticket.model";
import crypto from 'crypto';

// Batch creation of tickets for a newly created event
const createTicketsForEvent = async (event: IEvent, numberOfTickets: number) => {
  // Create and save tickets
  for (let i = 0; i < numberOfTickets; i++) {
    const ticket = new Ticket({ eventid: event._id });
    await ticket.save();
  }
};

// Generates Ticket Identifier (requires the ticket's id, event's id, and the owner/purchaser of the ticket's id)
const generateTicketUID = async (ticket: ITicket, event: IEvent, ownerid: string) => {
  const rawTicketUID = `${ticket._id}::${event._id}::${ownerid}`;
  const ticketUID = crypto.createHash('sha256').update(rawTicketUID).digest('hex');
  return ticketUID;
};

export {
  createTicketsForEvent,
  generateTicketUID,
}