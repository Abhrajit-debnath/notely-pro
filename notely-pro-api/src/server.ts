import "dotenv/config";
import express from "express";
import cors from "cors";
import { pinoHttp } from 'pino-http';
import { logger } from "./config/logger.js";
import router from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// Register the HTTP request logger middleware
app.use(pinoHttp({ logger }));

const PORT = process.env.PORT || 3000;

// Attached main router
app.use(router);

// Disable the default Express headers
app.disable('x-powered-by');

// Health status
app.get("/api-health", (req, res) => {
    req.log.info("Health check endpoint called");
    res.json({ status: "API is healthy" });
});

// Global Error Handler Middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
     logger.info(`Server is running on port ${PORT}`);  
});