import express from "express";
// import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import { pinoHttp } from 'pino-http';
import { logger } from "./config/logger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



 // Register the HTTP request logger middleware with the custom logger
app.use(pinoHttp({ logger }))


const PORT = process.env.PORT || 3000;


//health status
app.get("/api-health", (req, res) => {
    req.log.info("Health check endpoint called");
    res.json({ status: "API is healthy" });
});

app.listen(PORT, () => {
     logger.info(`Server is running on port ${PORT}`);  
});