import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import User from "@models/User.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import PasswordResponse from "@utils/responses/PasswordResponse";
import { NextFunction, Response } from "express";

const updatePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userid } = req.params;
    const { currentpassword, newpassword } = req.body;

    // Validate Request Body
    if (!currentpassword || !newpassword) throw new ErrorResponse(400, "current password and new password are required");

    // Ensure the authenticated user matches the user ID in the URL params
    if (userid !== req.user?.userid) {
      throw new ErrorResponse(403, 'JWT token and URL parameter user IDs do not match');
    }

    // Find the user by ID
    const user = await User.findById(userid);

    // Check if the user exists
    if (!user) {
      throw new ErrorResponse(404, 'User not found');
    }

    // Check if the current password provided in the request matches the stored password
    const isPasswordValid = user.comparePassword(currentpassword);

    if (!isPasswordValid) {
      throw new ErrorResponse(401, 'current password is incorrect');
    }

    // Update the user's password
    user.password = newpassword;

    // Save the updated user document
    await user.save();

    // Respond with a success message
    const response = new PasswordResponse();
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

export {
  updatePassword
}