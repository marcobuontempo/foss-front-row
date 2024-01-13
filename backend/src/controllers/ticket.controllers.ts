import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Event from "@models/Event.model";
import Order from "@models/Order.model";
import Ticket from "@models/Ticket.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { generateTicketUID } from "@utils/services/ticketService";
import { NextFunction, Request, Response } from "express";

const getAllTickets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get tickets
    const { eventid } = req.params;
    const tickets = await Ticket.find({ eventid }).select({ __v: false });

    // Send success response
    const response = new SuccessResponse({
      message: "tickets retrieved successfully",
      data: tickets
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const getOneTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get ticket
    const { eventid, ticketid } = req.params;
    const ticket = await Ticket.findOne({ _id: ticketid, eventid }).select({ __v: false });
    if (!ticket) throw new ErrorResponse(400, "ticket not found");

    // Send success response
    const response = new SuccessResponse({
      message: "ticket retrieved successfully",
      data: ticket
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const orderTickets = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get required values
    const { eventid } = req.params;
    const { tickets } = req.body;
    const userid = req.user?.userid;

    if (!tickets || tickets.length === 0) throw new ErrorResponse(400, '`tickets` field is required');

    // Check ticket availability
    const availableTickets = await Ticket.find({
      _id: { $in: tickets },
      available: true,
    });

    // Some requested tickets are not available
    if (availableTickets.length !== tickets.length) throw new ErrorResponse(400, 'some tickets are not available');

    // Create an order
    const order = new Order({
      userid,
      eventid,
      tickets,
      totalQuantity: tickets.length,
      totalPrice: availableTickets.reduce((acc, ticket) => acc + ticket.price, 0),
    });

    // Save the order to the database
    await order.save();

    // Update ticket availability
    await Ticket.updateMany(
      { _id: { $in: tickets } },
      { $set: { available: false } }
    );

    // Send success response
    const response = new SuccessResponse({
      message: "tickets ordered successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find ticket, update, and validate
    const { eventid, ticketid } = req.params;
    await Ticket.findOneAndUpdate({ _id: ticketid, eventid }, req.body, { runValidators: true });

    // Send success response
    const response = new SuccessResponse({
      message: "ticket updated successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find ticket and delete
    const { eventid, ticketid } = req.params;
    await Ticket.findOneAndDelete({ _id: ticketid, eventid });

    // Send success response
    const response = new SuccessResponse({
      message: "ticket deleted successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const getTicketIdentifier = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ticketid, eventid } = req.params;

    // Get ticket owner (i.e. current auth user, since middleware has already determined they are ticket owner)
    const ownerid = req.user?.userid;

    // Get event info
    const event = await Event.findById(eventid);

    // Get ticket info
    const ticket = await Ticket.findById(ticketid);

    // Create ticket identifier
    if (!ownerid || !event || !ticket) throw new ErrorResponse(422, "cannot process invalid ticket");
    const ticketUID = await generateTicketUID(ticket, event, ownerid);

    // Send success response
    const response = new SuccessResponse({
      message: 'ticket uid successfully generated',
      data: {
        uid: ticketUID,
        info: {
          eventid: event._id,
          ticketid: ticket._id,
          title: event.title,
          unixdatetime: new Date(event.date).getTime(),
          venue: event.venue,
          seat: ticket.seat,
        }
      }
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const consumeTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ticketid } = req.params;

    // Get ticket info
    const ticket = await Ticket.findById(ticketid);

    if (!ticket) throw new ErrorResponse(422, "cannot process invalid ticket");
    if (ticket.consumed === true) throw new ErrorResponse(422, "cannot process ticket already consumed");

    // Update ticket
    ticket.consumed = true;
    ticket.save();

    // Send success response
    const response = new SuccessResponse({
      message: "ticket successfully consumed",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

export {
  getAllTickets,
  getOneTicket,
  orderTickets,
  updateTicket,
  deleteTicket,
  getTicketIdentifier,
  consumeTicket,
}