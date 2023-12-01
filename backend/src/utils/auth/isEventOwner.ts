import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Event from "@models/Event.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";

// Ensure the authenticated user is the owner of the Event
const isEventOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get event
    const { eventid } = req.params;
    const event = await Event.findOne({ _id: eventid, owner: req.user?.userid });

    // If no event found, then user is not the event owner
    if (!event) throw new ErrorResponse(401, 'user must be the Event owner to access this ability');
    
    return next();

  } catch (error) {
    next(error);
  }
}

export { isEventOwner }