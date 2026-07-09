import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { pinoHttp } from 'pino-http';
import { logger } from "./config/logger.js";
import router from "./routes/index.js";
import { ZodError } from "zod";
import responseSender from "./globals/response.global.js";
import { AppError } from "./globals/error.global.js";


const app = express();

app.use(cors());
app.use(express.json());

// Register the HTTP request logger middleware
app.use(pinoHttp({ logger }));

const PORT = process.env.PORT || 3000;

// Attached main router
app.use(router);

// Health status
app.get("/api-health", (req, res) => {
    req.log.info("Health check endpoint called");
    res.json({ status: "API is healthy" });
});

// Global Error Handler Middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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
});

app.listen(PORT, () => {
     logger.info(`Server is running on port ${PORT}`);  
});