import { Request, Response } from "express";
import UserModel from "../models/User";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = UserModel.find();
  res.json(users);
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getAllUsers,
  getUserById,
}