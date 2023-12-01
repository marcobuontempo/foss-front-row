import Order from "@models/Order.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { NextFunction, Request, Response } from "express";

const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get orders
    const orders = await Order.find({}).select({ __v: false });

    // Send success response
    const response = new SuccessResponse({
      message: "orders retrieved successfully",
      data: orders
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const getOneOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get order
    const { orderid } = req.params;
    const order = await Order.findById(orderid);
    if (!order) throw new ErrorResponse(400, "order not found");

    // Send success response
    const response = new SuccessResponse({
      message: "order retrieved successfully",
      data: order
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find order and delete
    const { orderid } = req.params;
    await Order.findByIdAndDelete(orderid);

    // Send success response
    const response = new SuccessResponse({
      message: "order deleted successfully",
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

export {
  getAllOrders,
  getOneOrder,
  deleteOrder,
}