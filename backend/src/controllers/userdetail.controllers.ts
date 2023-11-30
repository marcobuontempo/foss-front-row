import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import User from "@models/User.model";
import { isAdmin } from "@utils/auth/isAdmin";
import { NextFunction, Request, Response } from "express";

const getAllUserDetails = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Verify user has admin privileges
        // isAdmin(req);
        // const users = User.find({}).select({ __v: false });
        // res.send(users);
        res.send(req.user)
    } catch (error) {
        next(error);
    }
};

const getOneUserDetails = async (req: Request, res: Response): Promise<void> => {
    res.send("/userdetails/{userid}")
};

const updateUserDetails = async (req: Request, res: Response): Promise<void> => {
    res.send("/userdetails/{userid}")
};


export {
    getAllUserDetails,
    getOneUserDetails,
    updateUserDetails
}