import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Order from "@models/Order.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";

// Ensure the authenticated user is the owner of the Order
const isOrderOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // See if order can be found (where owner must match auth user's details)
    const { orderid } = req.params;
    const order = await Order.findOne({ _id: orderid, user: req.user?.userid });

    if (order) return next();

    throw new ErrorResponse(401, 'user must be the Order owner to perform this action');

  } catch (error) {
    next(error);
  }
}

export { isOrderOwner }