import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const errorResponseHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorResponse) {
    res
      .status(err.statusCode)
      .json({ success: false, errors: err.message });
  } else if (err instanceof mongoose.Error.ValidationError) {
    res
      .status(400)
      .json({ success: false, errors: Object.keys(err.errors).map(k => err.errors[k]["message"].replace("Path ", "")) });
  } else {
    res
      .status(500)
      .json({ success: false, errors: 'something went wrong' });
  }
};

export default errorResponseHandler;

