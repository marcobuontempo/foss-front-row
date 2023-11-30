import { IEvent } from "@models/Event.model";
import Ticket from "@models/Ticket.model";

const createTicketsForEvent = async (event: IEvent, numberOfTickets: number) => {
  // Create and save tickets
  for (let i = 0; i < numberOfTickets; i++) {
    const ticket = new Ticket({ eventid: event._id });
    await ticket.save();
  }
};

export { createTicketsForEvent }