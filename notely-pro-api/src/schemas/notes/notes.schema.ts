import * as z from "zod";

export const createNoteSchema = z.object({
  body: z.object({
    title: z
      .string({ error: "Title is required" })
      .trim()
      .min(1, "Title cannot be empty")
      .max(100, "Title must be at most 100 characters long"),
    content: z
      .string({ error: "Content is required" })
      .trim()
      .min(1, "Content cannot be empty"),
  }),
});

export const updateNoteSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid note ID format"),
  }),
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Title cannot be empty")
      .max(100, "Title must be at most 100 characters long")
      .optional(),
    content: z
      .string()
      .trim()
      .min(1, "Content cannot be empty")
      .optional(),
  }),
});

export const noteIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid note ID format"),
  }),
});