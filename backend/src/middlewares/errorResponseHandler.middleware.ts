import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const errorResponseHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorResponse) {
    res
      .status(err.statusCode)
      .json({ status: "error", errors: err.message });
  } else if (err instanceof mongoose.Error.ValidationError) {
    res
      .status(400)
      .json({ status: "error", errors: Object.keys(err.errors).map(k => err.errors[k]["message"]) });
  } else {
    res
      .status(500)
      .json({ status: "error", errors: 'something went wrong' });
  }
};

export default errorResponseHandler;
