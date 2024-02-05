import User from "@models/User.model";
import UserDetail from "@models/UserDetail.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { AuthenticatedRequest } from "@middlewares/authentication.middleware";

/**
 * @swagger
 * /users/{userid}/password:
 *   put:
 *     summary: Update the password for a specific user
 *     description: |
 *       This endpoint allows updating the password for a specific user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to update the password
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing the current and new passwords
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentpassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newpassword:
 *                 type: string
 *                 description: The new password to be set for the user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful password update.
 *       '400':
 *         description: Bad Request. Current password and new password are required.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '404':
 *         description: Not Found. User with the specified ID not found.
 *       '500':
 *         description: Internal Server Error. Something went wrong during password update.
 */
const updatePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userid } = req.params;
    const { currentpassword, newpassword } = req.body;

    // Validate Request Body
    if (!currentpassword || !newpassword) throw new ErrorResponse(400, "current password and new password are required");

    // Find the user by ID
    const user = await User.findById(userid);

    // Check if the user exists
    if (!user) throw new ErrorResponse(404, 'user not found');

    // Check if the current password provided in the request matches the stored password
    const isPasswordValid = await user.comparePassword(currentpassword);

    if (!isPasswordValid) throw new ErrorResponse(401, 'current password is incorrect');

    // Update the user's password
    user.password = newpassword;

    // Save the updated user document
    await user.save();

    // Send success response
    const response = new SuccessResponse({
      message: "password updated successfully"
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /users/{userid}:
 *   delete:
 *     summary: Delete a specific user
 *     description: |
 *       This endpoint allows deleting a specific user from both the User and UserDetail collections.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userid
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful deletion of the user.
 *       '403':
 *         description: Forbidden. Deletion of admin accounts is not allowed.
 *       '404':
 *         description: Not Found. User with the specified ID not found.
 *       '401':
 *         description: Unauthorized. Authentication token is missing or invalid.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user deletion.
 */
const deleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Find user and delete from both User and UserDetail collections
    const { userid } = req.params;

    const user = await User.findById(userid);

    // Check user exists to delete
    if (!user) throw new ErrorResponse(404, 'user not found')

    // Prevent deletion of admin accounts
    if (user.role === 'admin') throw new ErrorResponse(403, 'account is protected from deletion')

    // Process deletions
    await User.findByIdAndDelete(userid);
    await UserDetail.findByIdAndDelete(userid);

    // Send success response
    const response = new SuccessResponse({
      message: "user deleted successfully"
    });
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

export {
  updatePassword,
  deleteUser
}