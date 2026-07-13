import { Router } from "express";
import { prisma } from "../../config/db/db.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { NoteRepository } from "../../repositories/notes.repository.js";
import { NoteService } from "../../services/notes/notes.service.js";
import { NoteController } from "../../controllers/notes/notes.controller.js";
import {
  createNoteSchema,
  updateNoteSchema,
  noteIdParamSchema,
} from "../../schemas/notes/notes.schema.js";

const router: Router = Router();

// Instantiate dependencies
const noteRepository = new NoteRepository(prisma);
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

// Get all notes of the authenticated user
router.get("/", authMiddleware, noteController.getAllNotes);

//Get a single note by ID
router.get(
  "/:id",
  authMiddleware,
  validate(noteIdParamSchema),
  noteController.getNoteById
);

//  Create a new note
router.post(
  "/",
  authMiddleware,
  validate(createNoteSchema),
  noteController.createNote
);

// Update a note by ID
router.put(
  "/:id",
  authMiddleware,
  validate(updateNoteSchema),
  noteController.updateNote
);

// Delete a note by ID
router.delete(
  "/:id",
  authMiddleware,
  validate(noteIdParamSchema),
  noteController.deleteNote
);

export default router;