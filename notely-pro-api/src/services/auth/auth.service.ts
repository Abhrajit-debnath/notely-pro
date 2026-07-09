import type { RegisterUserData } from "./types/register.type.js";
import type { UserRepository } from "../../repositories/auth.repository.js";
import type { User } from "../../generated/prisma/index.js";
import { hashPassword } from "../../utils/auth/hash.util.js";
import { AppError } from "../../globals/error.global.js";

export class RegisterService {
    constructor(private userRepository: UserRepository) { }

    registerUser = async (userData: RegisterUserData): Promise<User> => {
        try {
            // 1. Check if user already exists
            const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new AppError(400, "Email already registered");
            }

            // 2. Hash password
            const hashedPassword = await hashPassword(userData.password);

            // 3. Create the user
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