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
  // Hash ownerid
  const owneridHash = crypto.createHash('sha256').update(ownerid).digest('hex');

  // Convvert date string to unix time
  const unixTimestamp = new Date(event.date).getTime();

  // Create and return uid
  const ticketUID = `${ticket._id}::${ticket.eventid}::${ticket.seat}::${event.title}::${unixTimestamp}::${event.venue}::${owneridHash}`;
  return ticketUID;
};

export {
  createTicketsForEvent,
  generateTicketUID,
}