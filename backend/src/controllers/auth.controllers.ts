import User from "@models/User.model";
import UserDetail from "@models/UserDetail.model";
import { generateToken } from "@utils/auth/jwtUtils";
import ErrorResponse from "@utils/responses/ErrorResponse";
import LoginResponse from "@utils/responses/LoginResponse";
import RegisterResponse from "@utils/responses/RegisterResponse";
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
    if (existingUser) throw new ErrorResponse(409, "username already exists");
    const existingUserDetail = await UserDetail.findOne({ email });
    if (existingUserDetail) throw new ErrorResponse(409, "email already exists");

    // Save the user to the database
    await newUser.save();

    // Set UserDetail's userID to the generated userID value
    newUserDetail._id = newUser._id;

    // Save the user details to the database
    await newUserDetail.save();

    // Send successful response
    const response = new RegisterResponse();
    res.status(201).json(response);

  } catch (error) {
    // Handle the error response in middleware
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate Request Body
    await new User({ username, password }).validate();

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) throw new ErrorResponse(404, 'username not found');

    // Compare the entered password with the stored hashed password
    const passwordMatch = await user.comparePassword(password);

    // Check if the passwords match
    if (!passwordMatch) throw new ErrorResponse(401, 'invalid password');

    // Passwords match, user is authenticated. Generate JWT
    const token = generateToken(user);

    // Send successful response
    const response = new LoginResponse(token);
    res.status(200).json(response);

  } catch (error) {
    // Handle the error response in middleware
    next(error);
  }
};

export {
  login,
  register
}