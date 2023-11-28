import User from "@models/user";
import UserDetail from "@models/userdetail";
import { Request, Response } from "express";
import { startSession } from "mongoose";

const register = async (req: Request, res: Response): Promise<void> => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { username, password, firstname, lastname, email, phone, address, dob } = req.body;

    // TODO: Validate the request body
    // TODO: Check if the username already exists. 
    // TODO: Check is email already exists.

    // Create a new user
    const newUser = new User({ username, password });

    // Save the user to the database
    await newUser.save({ session });

    // Get the generated user id
    const userID = newUser._id;

    // Create the user details
    const newUserDetail = new UserDetail({ userID, firstname, lastname, email, phone, address, dob });

    // Save the user details to the database
    await newUserDetail.save({ session });

    // If everything is successful, commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'user registered successfully' });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error in register controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  res.send("/login")
};

export { login, register }