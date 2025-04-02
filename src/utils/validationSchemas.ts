import { z } from "zod";

// Register Schema
export const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

// Update User Profile Schema
export const updateUserSchema = z.object({
    username: z.string().min(2).max(100).optional(),
    email: z.string().min(3).max(200).email().optional(),
    password: z.string().min(6).optional(),
    photo: z.string().url({ message: "Invalid image URL format" }).optional(),
});
