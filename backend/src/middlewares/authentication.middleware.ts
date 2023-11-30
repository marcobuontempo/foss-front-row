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
    const UNAUTHENTICATED_ROUTES = [
        '/',
        '/auth/login',
        '/auth/register'
    ];
    // Skip authentication for specific routes
    if (UNAUTHENTICATED_ROUTES.includes(req.path)) {
        return next();
    }

    // Access the "Authorization" header
    const authHeader = req.headers?.['authorization'];
    if (authHeader) {
        // Verify
        const [tokenType, token] = authHeader.split(" ");
        if (tokenType !== "Bearer") throw new ErrorResponse(401, "invalid token type: missing Bearer");
        const decoded = verifyToken(token) as JwtPayload;
        req.user = {
            userid: decoded.userid,
            username: decoded.username,
            role: decoded.role,
        };
        return next();
    } else {
        throw new ErrorResponse(401, "authorization header is missing");
    }
};

export { authenticate };