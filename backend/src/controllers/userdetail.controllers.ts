import UserDetail from "@models/UserDetail.model";
import AllUserDetailsResponse from "@utils/responses/userdetail/AllUserDetailsResponse";
import ErrorResponse from "@utils/responses/ErrorResponse";
import GetOneUserDetailsResponse from "@utils/responses/userdetail/GetOneUserDetailsResponse";
import UpdateUserDetailsResponse from "@utils/responses/userdetail/UpdateUserDetailsResponse";
import { NextFunction, Request, Response } from "express";

const getAllUserDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get all UserDetails
        const users = await UserDetail.find({}).select({ __v: false });

        // Send success response
        const response = new AllUserDetailsResponse(users);
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
        const response = new GetOneUserDetailsResponse(user);
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
        const response = new UpdateUserDetailsResponse();
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