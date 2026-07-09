import type { Request, Response, NextFunction } from "express";
import { type ZodObject, ZodError } from "zod";
import { logger } from "../config/logger.js";

// Resuable middleware for validating request data against a Zod schema
export const validate = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })

            next()
        } catch (error) {
            if (error instanceof ZodError) {
                logger.error(error);
            }

            next(error)
        }
    }
}