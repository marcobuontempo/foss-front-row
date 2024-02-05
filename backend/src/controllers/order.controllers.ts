import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import Order from "@models/Order.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { NextFunction, Request, Response } from "express";

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: |
 *       This endpoint retrieves all orders from the database.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of orders.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'  # Reference to the schema of your Order model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal Server Error. Something went wrong during orders retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getAllOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
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

/**
 * @swagger
 * /orders/user/{userid}:
 *   get:
 *     summary: Get orders for a specific user
 *     description: |
 *       This endpoint retrieves orders for a specific user from the database, including associated events and tickets.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to retrieve orders for
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of orders.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'  # Reference to the schema of your Order model
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. User with the specified ID not found or has no orders.
 *       '500':
 *         description: Internal Server Error. Something went wrong during orders retrieval.
 */
const getUserOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userid } = req.params;

    // Get orders
    const orders = await Order
      .find({ user: userid })
      .populate({
        path: 'event',
        model: 'Event',
        select: '-__v',
      })
      .populate({
        path: 'tickets',
        model: 'Ticket',
        select: '-__v'
      })
      .select({ __v: false });

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

/**
 * @swagger
 * /orders/{orderid}:
 *   get:
 *     summary: Get details of a single order
 *     description: |
 *       This endpoint retrieves details of a single order from the database.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderid
 *         description: ID of the order to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of the order.
 *                 data:
 *                   $ref: '#/components/schemas/Order'  # Reference to the schema of your Order model
 *       '400':
 *         description: Bad Request. Order with the specified ID not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during order retrieval.
 */
const getOneOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
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

/**
 * @swagger
 * /orders/{orderid}:
 *   delete:
 *     summary: Delete an existing order
 *     description: |
 *       This endpoint deletes an existing order from the database.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderid
 *         description: ID of the order to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful deletion of the order.
 *       '404':
 *         description: Not Found. Order with the specified ID not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during order deletion.
 */
const deleteOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
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
  getUserOrders,
  getOneOrder,
  deleteOrder,
}