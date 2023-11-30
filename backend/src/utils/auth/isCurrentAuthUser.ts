import { AuthenticatedRequest } from "@middlewares/authentication.middleware";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Response } from "express";

// Ensure the authenticated user matches the user ID in the URL params
const isCurrentAuthUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.params?.userid === req.user?.userid) {
    return next();
  } else {
    throw new ErrorResponse(403, 'JWT token and URL parameter user IDs do not match');
  }
}

export { isCurrentAuthUser }