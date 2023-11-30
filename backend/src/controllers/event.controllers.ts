import Event from "@models/Event.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import AllEventsResponse from "@utils/responses/event/AllEventsResponse";
import CreateNewEventResponse from "@utils/responses/event/CreateNewEventResponse";
import DeleteEventResponse from "@utils/responses/event/DeleteEventResponse";
import GetOneEventResponse from "@utils/responses/event/GetOneEventResponse";
import UpdateEventResponse from "@utils/responses/event/UpdateEventResponse";
import { NextFunction, Request, Response } from "express";

const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get all events
    const events = await Event.find({}).select({ __v: false });

    // Send success response
    const response = new AllEventsResponse(events);
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const getOneEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get single event
    const { eventid } = req.params;
    const event = await Event.findById(eventid).select({ __v: false });
    if (!event) throw new ErrorResponse(404, 'event not found');

    // Send success response
    const response = new GetOneEventResponse(event);
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const createNewEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Create a new Event document
    const newEvent = new Event(req.body);

    // Save the event to the database (will self validate in this step)
    await newEvent.save();

    // Send successful response
    const response = new CreateNewEventResponse();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find event, update, and validate
    const { eventid } = req.params;
    await Event.findByIdAndUpdate(eventid, req.body, { runValidators: true });

    // Send success response
    const response = new UpdateEventResponse();
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find event and delete
    const { eventid } = req.params;
    await Event.findByIdAndDelete(eventid);
    
    // Send success response
    const response = new DeleteEventResponse();
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

export {
  getAllEvents,
  getOneEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
}