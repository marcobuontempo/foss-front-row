import { Request, Response } from "express";

const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  res.send("/events")
};

const getOneEvent = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/{eventID}")
};

const createNewEvent = async (req: Request, res: Response): Promise<void> => {
  res.send("/events")
};

const updateEvent = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/{eventID}")
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  res.send("/events/{eventID}")
};

export {
  getAllEvents,
  getOneEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
}