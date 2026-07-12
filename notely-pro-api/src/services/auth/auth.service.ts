import type { RegisterUserData } from "./types/register.type.js";
import type { LoginUserData } from "./types/login.type.js";
import type { UserRepository } from "../../repositories/auth.repository.js";
import type { User } from "../../generated/prisma/index.js";
import { comparePassword, hashPassword } from "../../utils/auth/hash.util.js";
import { AppError } from "../../globals/error.global.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/auth/token.utils.js";

export interface LoginResponse {
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
}

export class RegisterService {
  constructor(private userRepository: UserRepository) {}

  registerUser = async (userData: RegisterUserData): Promise<User> => {
    try {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new AppError(400, "Email already registered");
      }

      const hashedPassword = await hashPassword(userData.password);
      if (!hashedPassword) {
        throw new AppError(500, "Error hashing password");
      }

      const user = await this.userRepository.saveUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      throw error;
    }
  };
}

export class LoginService {
  constructor(private userRepository: UserRepository) {}

  loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
    try {
      // 1. Fetch user by email
      const existingUser = await this.userRepository.findByEmail(userData.email);
      
      // 2. Validate user existence and password presence
      if (!existingUser || !existingUser.password) {
        throw new AppError(400, "User not found");
      }

      // 3. Verify password
      const isPasswordValid = await comparePassword(
        userData.password,
        existingUser.password
      );
      if (!isPasswordValid) {
        throw new AppError(400, "Invalid credentials");
      }

     
      const tokenPayload = { userId: existingUser.id, email: existingUser.email };
      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      const { password, ...userWithoutPassword } = existingUser;

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  };
}
