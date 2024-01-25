import { IEvent } from "@models/Event.model";
import Ticket, { ITicket } from "@models/Ticket.model";
import crypto from 'crypto';
import { ClientSession } from "mongoose";

// Batch creation of tickets for a newly created event
const createTicketsForEvent = async (event: IEvent, numberOfTickets: number, session: ClientSession) => {
  // Create tickets
  const tickets: ITicket[] = Array.from({ length: numberOfTickets }, () => new Ticket({ event: event._id }));
  // Save tickets
  await Ticket.insertMany(tickets, { session });
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