import User from "@models/User.model";
import UserDetail from "@models/UserDetail.model";
import DeleteUserResponse from "@utils/responses/user/DeleteUserResponse";
import ErrorResponse from "@utils/responses/ErrorResponse";
import PasswordResponse from "@utils/responses/user/PasswordResponse";
import { NextFunction, Request, Response } from "express";

const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    const response = new PasswordResponse();
    res.status(200).json(response);

  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find user and delete from both User and UserDetail collections
    const { userid } = req.params;
    await User.findByIdAndDelete(userid);
    await UserDetail.findByIdAndDelete(userid);

    // Send success response
    const response = new DeleteUserResponse();
    res.status(200).json(response);
    
  } catch (error) {
    next(error);
  }
};

export {
  updatePassword,
  deleteUser
}