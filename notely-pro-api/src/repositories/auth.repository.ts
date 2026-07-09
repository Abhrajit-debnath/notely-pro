import type { User, Prisma, PrismaClient } from "../generated/prisma/index.js";

export class UserRepository {
    constructor(private prisma: PrismaClient) { }

    findByEmail = async (email: string): Promise<User | null> => {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
            });
        } catch (error) {
            throw error;
        }
    };

    saveUser = async (userData: Prisma.UserCreateInput): Promise<User> => {
        try {
            return await this.prisma.user.create({
                data: userData,
            });
        } catch (error) {
            throw error;
        }
    };
}