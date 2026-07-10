import type { RegisterUserData } from "./types/register.type.js";
import type { UserRepository } from "../../repositories/auth.repository.js";
import type { User } from "../../generated/prisma/index.js";
import { comparePassword, hashPassword } from "../../utils/auth/hash.util.js";
import { AppError } from "../../globals/error.global.js";
import responseSender from "../../globals/response.global.js";

export class RegisterService {
    constructor(private userRepository: UserRepository) { }

    registerUser = async (userData: RegisterUserData): Promise<User> => {
        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(
                userData.email,
            );
            if (existingUser) {
                throw new AppError(400, "Email already registered");
            }

            // Hash password
            const hashedPassword = await hashPassword(userData.password);

            // Create the user
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
    constructor(private userRepository: UserRepository) { }

    loginUser = async (userData: RegisterUserData): Promise<User> => {
        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(
                userData.email,
            );
            if (existingUser && existingUser.password) {
                // throw new AppError(400, "Email already registered");

                const isPasswordValid = await comparePassword(
                    userData.password,
                    existingUser.password,
                );
                if (!isPasswordValid) {
                    throw new AppError(400, "Invalid password");
                }
            } else {
                throw new AppError(400, "User not found");
            }

            return existingUser;
        } catch (error) {
            throw error;
        }
    };
}
