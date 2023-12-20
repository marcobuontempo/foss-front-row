import ErrorResponse from "@utils/responses/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import { MongoError, MongoServerError } from "mongodb";
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
  } else if (err.name === "MongoServerError" && (err as MongoServerError).code === 11000) {
    res
      .status(409)
      .json({ success: false, errors: "duplicate value used - must be unique" });
  } else {
    res
      .status(500)
      .json({ success: false, errors: 'something went wrong' });
  }
  console.log(err.name);
  console.log(err);
};

export default errorResponseHandler;

