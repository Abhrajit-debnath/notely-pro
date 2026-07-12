import type { Response } from "express";
import type { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const responseSender = (res: Response, statusCode: number, message: string | Error | JsonWebTokenError | TokenExpiredError, data: unknown) => {
   return res.status(statusCode).json({ message, data })
}

export default responseSender;