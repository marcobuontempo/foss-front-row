import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Event from "@models/Event.model";
import Ticket from "@models/Ticket.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { createTicketsForEvent } from "@utils/services/ticketService";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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

const deleteEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find event and delete
    const { eventid } = req.params;
    await Event.findByIdAndDelete(eventid);

    // Update all associated tickets to unavailable
    await Ticket.deleteMany({ eventid });

    // Send success response
    const response = new SuccessResponse({
      message: "event has been deleted successfully"
    });
    res.status(200).json(response);

  } catch (error) {
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