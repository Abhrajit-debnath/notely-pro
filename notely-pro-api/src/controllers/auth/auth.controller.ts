import type { Request, Response, NextFunction } from "express";
import type { RegisterService } from "../../services/auth/auth.service.js";
import responseSender from "../../globals/response.global.js";
import { logger } from "../../config/logger.js";
import { AppError } from "../../globals/error.global.js";

export class RegisterController {
  constructor(private registerService: RegisterService) {}

  registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerService.registerUser(req.body);


      if (!user) {
        new AppError(500, "User registration failed");
      }
      // Exclude password from response data
      const { password, ...userData } = user;

      responseSender(res, 201, "User registered successfully", userData);
      logger.info(`User registered successfully: ${user.email}`);
    } catch (error) {
      next(error);
    }
  };
}