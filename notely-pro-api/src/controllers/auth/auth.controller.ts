import type { Request, Response, NextFunction } from "express";
import type { LoginService, RegisterService } from "../../services/auth/auth.service.js";
import responseSender from "../../globals/response.global.js";
import { logger } from "../../config/logger.js";
import { AppError } from "../../globals/error.global.js";

export class RegisterController {
  constructor(private registerService: RegisterService) { }

  registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerService.registerUser(req.body);

      if (!user) {
        throw new AppError(500, "User registration failed");
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

export class LoginController {
  constructor(private loginService: LoginService) { }

  loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.loginService.loginUser(req.body);

      if (!user) {
        throw new AppError(500, "User login failed");
      }

      const { accessToken, refreshToken } = user;

      if (!accessToken || !refreshToken) {
        throw new AppError(500, "Failed to generate authentication tokens");
      }

      // set up cookie

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 48 * 1000
      });

      responseSender(res, 200, "User logged in successfully", user);
      logger.info(`User logged in successfully: ${user.user.email}`);
    } catch (error) {
      next(error);
    }
  };
}