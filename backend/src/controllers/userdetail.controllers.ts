import { Request, Response } from "express";

const getAllUserDetails = async (req: Request, res: Response): Promise<void> => {
    res.send("/userdetails")
};

const getOneUserDetails = async (req: Request, res: Response): Promise<void> => {
    res.send("/userdetails/{userid}")
};

const updateUserDetails = async (req: Request, res: Response): Promise<void> => {
    res.send("/userdetails/{userid}")
};


export {
    getAllUserDetails,
    getOneUserDetails,
    updateUserDetails
}