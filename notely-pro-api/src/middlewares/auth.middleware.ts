import type { NextFunction, Request, Response } from "express";
import responseSender from "../globals/response.global.js";
import { getSecret, verifyAccessToken } from "../utils/auth/token.utils.js";
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
            };
        }
    }
}

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")?.[1];


    if (!token) {
        responseSender(res, 401, "Unauthorized", null);
        return;
    }

    try {
        const decodedToken = verifyAccessToken(token) as { userId: string, email: string };

        if (decodedToken) {
            req.user = {
                userId: decodedToken.userId,
                email: decodedToken.email
            };
        }

        next()
    } catch (error) {
        next(error);
    }

    next();
}