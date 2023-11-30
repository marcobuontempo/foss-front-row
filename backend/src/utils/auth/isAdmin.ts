import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import { UserRole } from "@models/User.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction } from "express";

const isAdmin = (req: AuthenticatedRequest) => {
    console.log(req.user, UserRole.Admin)
    if(req.user?.role === UserRole.Admin) {
        return true;
    } else {
        throw new ErrorResponse(401, 'insufficient permissions: account must be of type `admin`')
    }
}

export { isAdmin }