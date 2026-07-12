import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";
import responseSender from "../globals/response.global.js";
import { AppError } from "../globals/error.global.js";
import { ZodError } from "zod";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    if (err instanceof AppError) {
        return responseSender(res, err.statusCode, err.message, null);
    }

    if (err instanceof ZodError) {
        return responseSender(
            res,
            400,
            "Validation Failed",
            err.issues.map((e) => ({ field: e.path.join('.'), message: e.message }))
        );
    }

    responseSender(res, 500, "Internal Server Error", null);
};
