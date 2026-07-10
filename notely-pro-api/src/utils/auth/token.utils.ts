import jwt from "jsonwebtoken";
import { AppError } from "../../globals/error.global.js";

export interface TokenPayload {
  userId: string;
  email: string;
}

// Helper to retrieve JWT secrets safely from environment
const getSecret = (envVar: string): string => {
  const secret = process.env[envVar];
  if (!secret) {
    throw new AppError(
      500,
      `Internal Server Configuration Error: ${envVar} is not defined in environment variables.`
    );
  }
  return secret;
};

/**
 * Generates a short-lived Access Token (used for authorizing API requests)
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = getSecret("JWT_ACCESS_SECRET");
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "15m";

  if (expiresIn){
    
  }

  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
};

/**
 * Generates a long-lived Refresh Token (used to request new access tokens)
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = getSecret("JWT_REFRESH_SECRET");
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d"; 

  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn as any,
  });
};

/**
 * Verifies an access token and returns the decoded payload
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  const secret = getSecret("JWT_ACCESS_SECRET");
  try {
    const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });
    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, "Unauthorized: Access token has expired.");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, "Unauthorized: Invalid access token.");
    }
    throw new AppError(401, "Unauthorized: Token verification failed.");
  }
};

/**
 * Verifies a refresh token and returns the decoded payload
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = getSecret("JWT_REFRESH_SECRET");
  try {
    const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });
    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, "Unauthorized: Refresh token has expired.");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, "Unauthorized: Invalid refresh token.");
    }
    throw new AppError(401, "Unauthorized: Token verification failed.");
  }
};