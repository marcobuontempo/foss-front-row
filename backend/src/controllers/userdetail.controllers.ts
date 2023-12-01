import UserDetail from "@models/UserDetail.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import SuccessResponse from "@utils/responses/SuccessResponse";
import { NextFunction, Request, Response } from "express";

const getAllUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

const getOneUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

const updateUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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