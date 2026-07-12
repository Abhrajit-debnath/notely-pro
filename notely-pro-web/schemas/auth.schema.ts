import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must be at most 50 characters long")
        .trim(),
    email: z
        .string()
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    passwordConfirmation: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});


export const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .trim()
        .toLowerCase(),
    password: z.string().min(1, "Password is required"),
});

// Infer values type from schema                                           
export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;

