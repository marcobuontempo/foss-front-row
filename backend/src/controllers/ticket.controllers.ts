import { Request, Response } from "express";

const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/:eventid/tickets")
};

const getOneTicket = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/{eventID}/tickets/{ticketid}")
};

const orderTickets = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/:eventid/tickets/order")
};

const updateTicket = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/{eventID}/tickets/{ticketid}")
};

const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/{eventID}/tickets/{ticketid}")
};

export {
  getAllTickets,
  getOneTicket,
  orderTickets,
  updateTicket,
  deleteTicket,
}