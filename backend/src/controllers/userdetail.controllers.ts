import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import UserDetail from "@models/UserDetail.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { NextFunction, Request, Response } from "express";

/**
 * @swagger
 * /userdetails:
 *   get:
 *     summary: Get all user details
 *     description: |
 *       This endpoint retrieves details of all users.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of user details.
 *                 data:
 *                   type: array
 *                   description: An array containing user details.
 *                   items:
 *                     $ref: '#/components/schemas/UserDetail'
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user details retrieval.
 */
const getAllUserDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get all UserDetails
    const users = await UserDetail.find({}).select({ __v: false });

    // Send success response
    const response = new SuccessResponse({
      message: "user details retrieved successfully",
      data: users
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /userdetails/{userid}:
 *   get:
 *     summary: Get details of a specific user
 *     description: |
 *       This endpoint retrieves details of a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to retrieve details
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful retrieval of user details.
 *                 data:
 *                   $ref: '#/components/schemas/UserDetail'
 *       '404':
 *         description: Not Found. User with the specified ID not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user details retrieval.
 */
const getOneUserDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get User
    const { userid } = req.params;
    const user = await UserDetail.findById(userid).select({ __v: false, createdAt: false, updatedAt: false });
    if (!user) throw new ErrorResponse(404, 'user not found');

    // Send success response
    const response = new SuccessResponse({
      message: "user details retrieved successfully",
      data: user
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /userdetails/{userid}:
 *   put:
 *     summary: Update details of a specific user
 *     description: |
 *       This endpoint allows updating details of a specific user, excluding the Date of Birth (DOB).
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to update details
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing the details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The updated first name of the user.
 *               lastname:
 *                 type: string
 *                 description: The updated last name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address of the user.
 *               phone:
 *                 type: string
 *                 description: The updated phone number of the user.
 *               address:
 *                 type: string
 *                 description: The updated address of the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful update of user details.
 *       '404':
 *         description: Not Found. User with the specified ID not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user details update.
 */
const updateUserDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    delete req.body['dob']; // Disallow update of DOB

    // Find user, update, and validate
    const { userid } = req.params;
    await UserDetail.findByIdAndUpdate(userid, req.body, { runValidators: true });

    // Send success response
    const response = new SuccessResponse({
      message: "user details updated successfully"
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};


export {
  getAllUserDetails,
  getOneUserDetails,
  updateUserDetails
}