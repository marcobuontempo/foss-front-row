import User from "@models/User";
import UserDetail from "@models/UserDetail";
import ErrorResponse from "@utils/ErrorResponse";
import SuccessResponse from "@utils/SuccessResponse";
import { NextFunction, Request, Response } from "express";

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { username, password, firstname, lastname, email, phone, address, dob } = req.body;

    // Create a new User and UserDetail
    const newUser = new User({ username, password });
    const newUserDetail = new UserDetail({ firstname, lastname, email, phone, address, dob });

    // Validate both models
    await newUser.validate();
    await newUserDetail.validate({ pathsToSkip: ["_id"] });

    // Ensure username and emails are unique
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new ErrorResponse("username already exists", 409);
    const existingUserDetail = await UserDetail.findOne({ email });
    if (existingUserDetail) throw new ErrorResponse("email already exists", 409);

    // Save the user to the database
    await newUser.save();

    // Set UserDetail's userID to the generated userID value
    newUserDetail._id = newUser._id;

    // Save the user details to the database
    await newUserDetail.save();

    // Send success response
    const response = new SuccessResponse('user registered successfully');
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  res.send("/login")
};

export { login, register }