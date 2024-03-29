import { z } from "zod";
 
export const loginSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3).max(16)
});
 
export type LoginSchema = typeof loginSchema;