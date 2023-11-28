import ErrorResponse from "@utils/ErrorResponse";
import { NextFunction, Request, Response } from "express";

const errorResponseHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorResponse) {
    res.status(err.statusCode).json({ errors: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorResponseHandler;

