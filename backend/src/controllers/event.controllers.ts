import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Event from "@models/Event.model";
import Order from "@models/Order.model";
import Ticket from "@models/Ticket.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { createTicketsForEvent } from "@utils/services/ticketService";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: |
 *       This endpoint retrieves all events from the database.
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of events.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'  # Reference to the schema of your Event model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during events retrieval.
 */
const getAllEvents = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get all events
    const events = await Event.find({}).select({ __v: false });

    // Send success response
    const response = new SuccessResponse({
      message: "events retrieved successfully",
      data: events
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}:
 *   get:
 *     summary: Get a single event by ID
 *     description: |
 *       This endpoint retrieves a single event by its ID from the database.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of the event.
 *                 data:
 *                   $ref: '#/components/schemas/Event'  # Reference to the schema of your Event model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. Event with the specified ID not found.
 *       '500':
 *         description: Internal Server Error. Something went wrong during event retrieval.
 */
const getOneEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get single event
    const { eventid } = req.params;
    const event = await Event.findById(eventid).select({ __v: false });
    if (!event) throw new ErrorResponse(404, 'event not found');

    // Send success response
    const response = new SuccessResponse({
      message: "event retrieved successfully",
      data: event
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/user/{userid}:
 *   get:
 *     summary: Get events owned by a user
 *     description: |
 *       This endpoint retrieves events owned by a specific user from the database.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to retrieve events for
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of events.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'  # Reference to the schema of your Event model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. User with the specified ID not found or has no events.
 *       '500':
 *         description: Internal Server Error. Something went wrong during events retrieval.
 */
const getUserEvents = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get User
    const { userid } = req.params;

    // Get all events
    const events = await Event.find({ owner: userid }).select({ __v: false });

    // Send success response
    const response = new SuccessResponse({
      message: "events retrieved successfully",
      data: events
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: |
 *       This endpoint creates a new event in the database, along with generating tickets for the event.
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Event details and ticket quantity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               venue:
 *                 type: string
 *               ticketQty:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful creation of the event.
 *       '400':
 *         description: Bad Request. Invalid input or missing required fields.
 *       '500':
 *         description: Internal Server Error. Something went wrong during event creation.
 */
const createNewEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, date, venue, ticketQty } = req.body;

    // Validate number of tickets
    if (ticketQty <= 0) throw new ErrorResponse(400, "ticketQty must be greater than 0")
    if (!ticketQty) throw new ErrorResponse(400, "ticketQty is required")

    // Create a new Event document
    const newEvent = new Event({ title, date, venue, owner: req.user?.userid });

    // Save the event to the database (will self validate in this step)
    await newEvent.save({ session });

    // Create tickets and add to the Event document
    await createTicketsForEvent(newEvent, ticketQty, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send successful response
    const response = new SuccessResponse({
      message: "event has been created successfully"
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
 * /events/{eventid}:
 *   put:
 *     summary: Update an existing event
 *     description: |
 *       This endpoint updates an existing event in the database.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event to update
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Updated event details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               venue:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful update of the event.
 *       '400':
 *         description: Bad Request. Invalid input or missing required fields.
 *       '404':
 *         description: Not Found. Event with the specified ID not found.
 *       '500':
 *         description: Internal Server Error. Something went wrong during event update.
 */
const updateEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find event, update, and validate
    const { eventid } = req.params;
    await Event.findByIdAndUpdate(eventid, req.body, { runValidators: true });

    // Send success response
    const response = new SuccessResponse({
      message: "event has been updated successfully"
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /events/{eventid}:
 *   delete:
 *     summary: Delete an existing event
 *     description: |
 *       This endpoint deletes an existing event from the database along with its associated tickets and orders.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: eventid
 *         description: ID of the event to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful deletion of the event.
 *       '404':
 *         description: Not Found. Event with the specified ID not found.
 *       '500':
 *         description: Internal Server Error. Something went wrong during event deletion.
 */
const deleteEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find event and delete
    const { eventid } = req.params;
    await Event.findByIdAndDelete(eventid);

    // Delete all associated tickets
    await Ticket.deleteMany({ event: eventid });

    // Delete all associated orders
    await Order.deleteMany({ event: eventid });

    // Send success response
    const response = new SuccessResponse({
      message: "event has been deleted successfully"
    });
    res.status(200).json(response);

  } catch (error) {
    // If an error occurs, abort the transaction and handle the error response in middleware
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export {
  getAllEvents,
  getOneEvent,
  getUserEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
}