import { Request, Response } from "express";

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  res.send("/orders")
};

const getOneOrder = async (req: Request, res: Response): Promise<void> => {
  res.send("/orders/{orderid}")
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  res.send("/orders/{orderid}")
};

export {
  getAllOrders,
  getOneOrder,
  deleteOrder,
}