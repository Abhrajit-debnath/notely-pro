import type { Request, Response, NextFunction } from "express";
import { OAuthService } from "../../services/auth/oAuth.service.js";
import responseSender from "../../globals/response.global.js";

export class OAuthController {
  constructor(private oauthService: OAuthService) {}

  oauthLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.oauthService.handleOAuthLogin(req.body);

      // Set httpOnly cookies for access/refresh tokens
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 48 * 1000,
      });

      responseSender(res, 200, "OAuth login successful", result);
    } catch (error) {
      next(error);
    }
  };
}