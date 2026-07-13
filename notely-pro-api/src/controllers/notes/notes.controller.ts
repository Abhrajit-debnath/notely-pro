
import type { Request, Response, NextFunction } from "express";
import type { NoteService } from "../../services/notes/notes.service.js";
import responseSender from "../../globals/response.global.js";
import { logger } from "../../config/logger.js";
import { AppError } from "../../globals/error.global.js";

export class NoteController {
    constructor(private noteService: NoteService) { }

    createNote = async (req: Request, res: Response, next: NextFunction):
        Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(401, "Unauthorized: User not authenticated");
            }

            const note = await this.noteService.createNote(userId, req.body);
            responseSender(res, 201, "Note created successfully", note);
            logger.info(`Note created successfully: ${note.id} for user           
  ${userId}`);
        } catch (error) {
            next(error);
        }
    };

    getAllNotes = async (req: Request, res: Response, next: NextFunction):
        Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(401, "Unauthorized: User not authenticated");
            }

            const notes = await this.noteService.getAllNotes(userId);
            responseSender(res, 200, "Notes retrieved successfully", notes);
        } catch (error) {
            next(error);
        }
    };

    getNoteById = async (req: Request, res: Response, next: NextFunction):
        Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(401, "Unauthorized: User not authenticated");
            }

            const { id } = req.params as { id: string };
            if (!id) {
                throw new AppError(400, "Note ID is required");
            }

            const note = await this.noteService.getNoteById(userId, id);
            responseSender(res, 200, "Note retrieved successfully", note);
        } catch (error) {
            next(error);
        }
    };

    updateNote = async (req: Request, res: Response, next: NextFunction):
        Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(401, "Unauthorized: User not authenticated");
            }

            const { id } = req.params as { id: string };
            if (!id) {
                throw new AppError(400, "Note ID is required");
            }

            const note = await this.noteService.updateNote(userId, id, req.body);
            responseSender(res, 200, "Note updated successfully", note);
            logger.info(`Note updated successfully: ${note.id}`);
        } catch (error) {
            next(error);
        }
    };

    deleteNote = async (req: Request, res: Response, next: NextFunction):
        Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError(401, "Unauthorized: User not authenticated");
            }

            const { id } = req.params as { id: string };
            if (!id) {
                throw new AppError(400, "Note ID is required");
            }

            const note = await this.noteService.deleteNote(userId, id);
            responseSender(res, 200, "Note deleted successfully", note);
            logger.info(`Note deleted successfully: ${note.id}`);
        } catch (error) {
            next(error);
        }
    };
}