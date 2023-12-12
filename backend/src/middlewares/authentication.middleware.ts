import { verifyToken } from "@utils/auth/jwtUtils";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: {
        userid: string,
        username: string,
        role: string,
    }
}

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // Access the token from the http-cookie
        const token = req.cookies?.token;
        
        if (token) {
            // Verify
            const decoded = verifyToken(token) as JwtPayload;
            req.user = {
                userid: decoded.userid,
                username: decoded.username,
                role: decoded.role,
            };
            return next();
        } else {
            throw new ErrorResponse(401, "unauthorised");
        }

    } catch (error) {
        next(error);
    }
};

export { authenticate };