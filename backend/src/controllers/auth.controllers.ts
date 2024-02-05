import User, { IUser } from "@models/User.model";
import UserDetail from "@models/UserDetail.model";
import ErrorResponse from "@utils/responses/ErrorResponse";
import { generateToken, verifyToken } from "@utils/auth/jwtUtils";
import { NextFunction, Request, Response } from "express";
import SuccessResponse from "@utils/responses/SuccessResponse";
import mongoose from "mongoose";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: |
 *       This endpoint registers a new user by creating both User and UserDetail documents in the database.
 *       It uses a MongoDB session to ensure data consistency and transactional integrity.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             address:
 *               type: string
 *             dob:
 *               type: string
 *               format: date
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful user registration.
 *       '400':
 *         description: Bad Request. Invalid input or missing required fields.
 *       '409':
 *         description: Bad Request. Duplicate email or username.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user registration.
 */
const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, password, firstname, lastname, email, phone, address, dob } = req.body;

    // Create a new User and UserDetail document
    const newUser = new User({ username, password });
    const newUserDetail = new UserDetail({ firstname, lastname, email, phone, address, dob });

    // Validate both models
    await newUser.validate();
    await newUserDetail.validate({ pathsToSkip: ["_id"] });

    // Save the user to the database
    await newUser.save({ session });

    // Set UserDetail's userID to the generated userID value
    newUserDetail._id = newUser._id;

    // Save the user details to the database
    await newUserDetail.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Send successful response
    const response = new SuccessResponse({
      message: "user registered successfully"
    });
    res.status(201).json(response);

  } catch (error) {
    // If an error occurs, abort the transaction and handle the error response in middleware
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: |
 *       This endpoint handles user login by validating the provided credentials,
 *       generating a JWT token upon successful authentication, and setting it as an HTTP cookie.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful user login.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID.
 *                     role:
 *                       type: string
 *                       description: User role.
 *       '400':
 *         description: Bad Request. Invalid input or missing required fields.
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 *       '404':
 *         description: Not Found. Username not found.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user login.
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate Request Body
    if (!username || !password) throw new ErrorResponse(400, 'username and password are required');

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

    // Set the JWT token as an HTTP cookie
    res.cookie('token', token, {
      httpOnly: true,  // Make the cookie accessible only through the HTTP request
      secure: true,  // Ensure the cookie is only sent over HTTPS
      sameSite: 'none',  // Allow cookie to be set on frontend
    });

    // Send successful response
    const response = new SuccessResponse({
      message: "user logged in successfully",
      data: {
        id: user.id,
        role: user.role,
      }
    })
    res.status(200).json(response);

  } catch (error) {
    // Handle the error response in middleware
    next(error);
  }
};

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: |
 *       This endpoint handles user logout by generating an expired and empty JWT token,
 *       and setting it as an HTTP cookie to invalidate the user's session.
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating successful user logout.
 *       '500':
 *         description: Internal Server Error. Something went wrong during user logout.
 */
const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Generate an expired and empty token
    const token = generateToken(null, { expiresIn: '0' })

    // Set the JWT token as an HTTP cookie
    res.cookie('token', token, {
      httpOnly: true,  // Make the cookie accessible only through the HTTP request
      secure: true,  // Ensure the cookie is only sent over HTTPS
      sameSite: 'none',  // Allow cookie to be set on frontend
    });

    // Send successful response
    const response = new SuccessResponse({
      message: "user logged out successfully"
    })
    res.status(200).json(response);

  } catch (error) {
    // Handle the error response in middleware
    next(error);
  }
};

export {
  register,
  login,
  logout
}