import { Request, Response } from "express";

const getAllUserDetails = async (req: Request, res: Response): Promise<void> => {
    res.send("/userdetails")
};


export default { getAllUserDetails }