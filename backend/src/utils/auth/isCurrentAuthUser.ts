import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import { UserRole } from "@models/User.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";
import { verifyAdmin } from "./isAdmin";

// Ensure the authenticated user matches the user ID in the URL params
const isCurrentAuthUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (req.params?.userid === req.user?.userid) {  // user requested in params matches the current authenticated user
      return next();
    } else if (verifyAdmin(req)) {  // OR, user is admin
      return next();
    } else {
      throw new ErrorResponse(403, 'JWT token and URL parameter user IDs do not match');
    }
    
  } catch (error) {
    next(error);
  }
}

export { isCurrentAuthUser }