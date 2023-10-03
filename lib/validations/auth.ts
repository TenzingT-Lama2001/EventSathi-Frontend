import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
})
export const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(100),
})
