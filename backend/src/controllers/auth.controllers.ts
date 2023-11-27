import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<void> => {
  res.send("/login")
};

const register = async (req: Request, res: Response): Promise<void> => {
  res.send("/register")
};

export { login, register }