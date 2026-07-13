import type { Note, Prisma, PrismaClient } from "../generated/prisma/index.js";

export class NoteRepository {
    constructor(private prisma: PrismaClient) { }

    findById = async (id: string): Promise<Note | null> => {
        try {
            return await this.prisma.note.findUnique({
                where: { id }
            });
        } catch (error) {
            throw error;
        }
    };

    findAllByUserId = async (userId: string): Promise<Note[]> => {
        try {
            return await this.prisma.note.findMany({
                where: {
                    authorId: userId
                }
            });
        } catch (error) {
            throw error;
        }
    };

    createNote = async (noteData: Prisma.NoteUncheckedCreateInput): Promise<Note> => {
        try {
            return await this.prisma.note.create({
                data: noteData,
            });
        } catch (error) {
            throw error;
        }
    };

    updateNote = async (id: string, noteData: Prisma.NoteUncheckedUpdateInput): Promise<Note> => {
        try {
            return await this.prisma.note.update({
                where: { id },
                data: noteData,
            });
        } catch (error) {
            throw error;
        }
    };

    deleteById = async (id: string): Promise<Note> => {
        try {
            return await this.prisma.note.delete({
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    };
}