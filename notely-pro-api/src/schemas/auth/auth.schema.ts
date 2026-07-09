import * as z from "zod";

// Reusable sanitizers
const emailSchema = z
  .string({ error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address")

const signupPasswordSchema = z
  .string({ error: "Password is required" })
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be at most 100 characters long") // Safe maximum for password managers
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character").optional()

/**
 * Register / Signup Schema
 */
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: emailSchema,
    password: signupPasswordSchema,
    passwordConfirmation: z.string({ error: "Password confirmation is required" }).optional(),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })
});

/**
 * Login / Signin Schema
 */
export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: z
      .string({ error: "Password is required" })
      .min(1, "Password is required"), 
  }),
});

// Infer TypeScript types directly from schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;