import type { Request, Response } from "express";

const aregisterController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
    } catch (error) {

    }
}
export default aregisterController;