import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Order from "@models/Order.model";
import Ticket from "@models/Ticket.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";
import { verifyAdmin } from "./isAdmin";

// Ensure the authenticated user is the owner of the Event
const isTicketOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Identify ticket owner
    const { ticketid } = req.params;
    const orders = await Order.find({ tickets: { $in: [ticketid] } })  // find orders containing the ticket
      .sort({ createdAt: -1 }); // sort by date the order is created
    const ownerid = orders[0].user.toString();  // select the owner of the most recent order containing the ticket (i.e. the current owner)

    if (ownerid === req.user?.userid) {  // user is ticket owner
      return next();
    } else if (verifyAdmin(req)) {  // OR, user is admin
      return next();
    } else {
      throw new ErrorResponse(403, 'user must be the Ticket owner to perform this action');
    }

  } catch (error) {
    next(error);
  }
}

export { isTicketOwner }