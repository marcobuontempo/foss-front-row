import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Event from "@models/Event.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";
import { verifyAdmin } from "./isAdmin";

// Ensure the authenticated user is the owner of the Event
const isEventOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get event
    const { eventid } = req.params;
    const event = await Event.findOne({ _id: eventid, owner: req.user?.userid }); // find event -> will only match if they are the 'owner'

    if (event) {  // user is event owner
      return next();
    } else if (verifyAdmin(req)) {  // OR, user is admin
      return next();
    } else {
      throw new ErrorResponse(401, 'user must be the Event owner to perform this action');
    }

  } catch (error) {
    next(error);
  }
}

export { isEventOwner }