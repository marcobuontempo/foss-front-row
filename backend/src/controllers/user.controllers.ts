import { Request, Response } from "express";

const updatePassword = async (req: Request, res: Response): Promise<void> => {
  res.send("/password")
};

export {
  updatePassword
}