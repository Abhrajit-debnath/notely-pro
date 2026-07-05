import express from "express";
// import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


 //health status
app.get("/api-health", (req, res) => {
    res.json({ status: "API is healthy" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});