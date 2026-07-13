import type { NoteRepository } from "../../repositories/notes.repository.js";
import type { Note } from "../../generated/prisma/index.js";
import { AppError } from "../../globals/error.global.js";

export class NoteService {
  constructor(private noteRepository: NoteRepository) {}

  /**
   * Create a new note for the authenticated user
   */
  createNote = async (userId: string, data: { title: string; content: string }): Promise<Note> => {
    try {
      return await this.noteRepository.createNote({
        title: data.title,
        content: data.content,
        authorId: userId,
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Fetch all notes belonging to the authenticated user
   */
  getAllNotes = async (userId: string): Promise<Note[]> => {
    try {
      return await this.noteRepository.findAllByUserId(userId);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Fetch a single note by ID and verify ownership
   */
  getNoteById = async (userId: string, noteId: string): Promise<Note> => {
    try {
      const note = await this.noteRepository.findById(noteId);
      
      if (!note) {
        throw new AppError(404, "Note not found");
      }

      // Check ownership
      if (note.authorId !== userId) {
        throw new AppError(403, "You do not have permission to access this note");
      }

      return note;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Update a note by ID and verify ownership
   */
  updateNote = async (
    userId: string,
    noteId: string,
    data: { title?: string; content?: string }
  ): Promise<Note> => {
    try {
      const note = await this.noteRepository.findById(noteId);

      if (!note) {
        throw new AppError(404, "Note not found");
      }

      // Check ownership
      if (note.authorId !== userId) {
        throw new AppError(403, "You do not have permission to update this note");
      }

      return await this.noteRepository.updateNote(noteId, {
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete a note by ID and verify ownership
   */
  deleteNote = async (userId: string, noteId: string): Promise<Note> => {
    try {
      const note = await this.noteRepository.findById(noteId);

      if (!note) {
        throw new AppError(404, "Note not found");
      }

      // Check ownership
      if (note.authorId !== userId) {
        throw new AppError(403, "You do not have permission to delete this note");
      }

      return await this.noteRepository.deleteById(noteId);
    } catch (error) {
      throw error;
    }
  };
}