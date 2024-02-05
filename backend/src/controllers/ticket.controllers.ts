import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Event from "@models/Event.model";
import Order from "@models/Order.model";
import Ticket from "@models/Ticket.model";
import { findTicketOwner } from "@utils/auth/isTicketOwner";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { generateTicketUID } from "@utils/services/ticketService";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

/**
 * @swagger
 * /events/{eventid}/tickets:
 *   get:
 *     summary: Get all tickets for a specific event
 *     description: |
 *       This endpoint retrieves all tickets for a specific event from the database.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event to retrieve tickets for
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Tickets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of tickets.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'  # Reference to the schema of your Ticket model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. Event with the specified ID not found or has no tickets.
 *       '500':
 *         description: Internal Server Error. Something went wrong during tickets retrieval.
 */
const getAllTickets = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get tickets
    const { eventid } = req.params;
    const tickets = await Ticket.find({ event: eventid }).select({ __v: false });

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

/**
 * @swagger
 * /events/{eventid}/tickets/{ticketid}:
 *   get:
 *     summary: Get details of a single ticket for a specific event
 *     description: |
 *       This endpoint retrieves details of a single ticket for a specific event from the database.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event the ticket belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ticketid
 *         description: ID of the ticket to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Ticket retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of the ticket.
 *                 data:
 *                   $ref: '#/components/schemas/Ticket'  # Reference to the schema of your Ticket model
 *       '400':
 *         description: Bad Request. Ticket with the specified ID not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. Event or Ticket with the specified IDs not found.
 *       '500':
 *         description: Internal Server Error. Something went wrong during ticket retrieval.
 */
const getOneTicket = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get ticket
    const { eventid, ticketid } = req.params;
    const ticket = await Ticket.findOne({ _id: ticketid, event: eventid }).select({ __v: false });
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

/**
 * @swagger
 * /tickets/user/{userid}:
 *   get:
 *     summary: Get tickets for a specific user
 *     description: |
 *       This endpoint retrieves tickets for a specific user from the database, including associated events.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to retrieve tickets for
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Tickets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of user's tickets.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'  # Reference to the schema of your Ticket model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. User with the specified ID not found or has no tickets.
 *       '500':
 *         description: Internal Server Error. Something went wrong during tickets retrieval.
 */
const getUserTickets = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userid } = req.params;
    const tickets = await Order.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userid),
        },
      },
      {
        $unwind: '$tickets',
      },
      {
        $lookup: {
          from: 'tickets',
          localField: 'tickets',
          foreignField: '_id',
          as: 'ticket',
        }
      },
      {
        $unwind: '$ticket',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'ticket.event',
          foreignField: '_id',
          as: 'ticket.event',
        }
      },
      {
        $unwind: '$ticket.event',
      },
      {
        $unwind: '$event'
      },
      {
        $replaceWith: '$ticket'
      },
      {
        $unset: [
          '__v',
          'event.__v'
        ]
      }
    ]);

    // Send success response
    const response = new SuccessResponse({
      message: "user's tickets retrieved successfully",
      data: tickets,
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}/tickets/order:
 *   post:
 *     summary: Order tickets for a specific event
 *     description: |
 *       This endpoint allows a user to order tickets for a specific event.
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: JSON object containing an array of ticket IDs to be ordered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tickets:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of ticket IDs to be ordered
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Tickets ordered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful ticket order.
 *       '400':
 *         description: Bad Request. Some or all requested tickets are not available.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during ticket ordering.
 */
const orderTickets = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

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
      user: userid,
      event: eventid,
      tickets,
      totalQuantity: tickets.length,
      totalPrice: availableTickets.reduce((acc, ticket) => acc + ticket.price, 0),
    });

    // Save the order to the database
    await order.save({ session });

    // Update ticket availability
    await Ticket.updateMany(
      {
        _id:
        {
          $in: tickets
        }
      },
      {
        $set:
        {
          available: false
        }
      }
      ,
      {
        session
      });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send success response
    const response = new SuccessResponse({
      message: "tickets ordered successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    // If an error occurs, abort the transaction and handle the error response in middleware
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}/tickets/{ticketid}:
 *   put:
 *     summary: Update details of a single ticket for a specific event
 *     description: |
 *       This endpoint updates details of a single ticket for a specific event in the database.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event the ticket belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ticketid
 *         description: ID of the ticket to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing the fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your properties to be updated here
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful update of the ticket.
 *       '404':
 *         description: Not Found. Event or Ticket with the specified IDs not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during ticket update.
 */
const updateTicket = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find ticket, update, and validate
    const { eventid, ticketid } = req.params;
    await Ticket.findOneAndUpdate({ _id: ticketid, event: eventid }, req.body, { runValidators: true });

    // Send success response
    const response = new SuccessResponse({
      message: "ticket updated successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}/tickets/{ticketid}:
 *   delete:
 *     summary: Delete a single ticket for a specific event
 *     description: |
 *       This endpoint deletes a single ticket for a specific event from the database.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event the ticket belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ticketid
 *         description: ID of the ticket to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful deletion of the ticket.
 *       '404':
 *         description: Not Found. Event or Ticket with the specified IDs not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during ticket deletion.
 */
const deleteTicket = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find ticket and delete
    const { eventid, ticketid } = req.params;
    await Ticket.findOneAndDelete({ _id: ticketid, event: eventid });

    // Send success response
    const response = new SuccessResponse({
      message: "ticket deleted successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}/tickets/{ticketid}/uid:
 *   get:
 *     summary: Get a unique identifier for a specific ticket
 *     description: |
 *       This endpoint retrieves a unique identifier for a specific ticket associated with an event.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event the ticket belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ticketid
 *         description: ID of the ticket to retrieve the unique identifier for
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Ticket UID retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of the ticket UID.
 *                 data:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                       description: The unique identifier for the ticket.
 *                     info:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the ticket.
 *                         event:
 *                           type: string
 *                           description: ID of the event.
 *                         title:
 *                           type: string
 *                           description: Title of the event.
 *                         venue:
 *                           type: string
 *                           description: Venue of the event.
 *                         unixdatetime:
 *                           type: number
 *                           description: Unix timestamp of the event date.
 *                         seat:
 *                           type: string
 *                           description: Seat information of the ticket.
 *       '404':
 *         description: Not Found. Event or Ticket with the specified IDs not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '422':
 *         description: Unprocessable Entity. Unable to generate UID for the invalid ticket.
 *       '500':
 *         description: Internal Server Error. Something went wrong during UID retrieval.
 */
const getTicketUID = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
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
          id: ticket._id,
          event: event._id,
          title: event.title,
          venue: event.venue,
          unixdatetime: new Date(event.date).getTime(),
          seat: ticket.seat,
        }
      }
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}/tickets/{ticketid}/consume:
 *   post:
 *     summary: Consume a specific ticket for a specific event
 *     description: |
 *       This endpoint allows the consumption of a specific ticket for a specific event.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event the ticket belongs to
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ticketid
 *         description: ID of the ticket to consume
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing the UID of the ticket to consume
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: UID of the ticket to consume
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Ticket consumed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful consumption of the ticket.
 *       '400':
 *         description: Bad Request. UID is required.
 *       '422':
 *         description: Unprocessable Entity. Unable to process the ticket or UID is invalid.
 *       '404':
 *         description: Not Found. Event or Ticket with the specified IDs not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during ticket consumption.
 */
const consumeTicket = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventid, ticketid } = req.params;
    const { uid } = req.body;

    if (!uid) throw new ErrorResponse(400, "uid required")

    // Get ticket info
    const ticket = await Ticket.findById(ticketid);
    const event = await Event.findById(ticket?.event);

    // Find ticket owner
    const ownerid = await findTicketOwner(eventid, ticketid);

    if (!ticket || !event || !ownerid) throw new ErrorResponse(422, "cannot process invalid ticket");
    if (ticket.consumed === true) throw new ErrorResponse(422, "cannot process ticket already consumed");

    // Verify UID
    const ticketUID = await generateTicketUID(ticket, event, ownerid);
    if (ticketUID !== uid) throw new ErrorResponse(422, "ticket has invalid uid");

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
  getUserTickets,
  orderTickets,
  updateTicket,
  deleteTicket,
  getTicketUID,
  consumeTicket,
}