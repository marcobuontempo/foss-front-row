import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import { UserRole } from "@models/User.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";

const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(req.user?.role === UserRole.Admin) {
        return next();
    } else {
        throw new ErrorResponse(401, 'insufficient permissions: account must be of type `admin`')
    }
}

export { isAdmin }