import * as z from 'zod';

export const speakerSchema = z.object({
  name: z.string().min(3).max(25),
  bio: z.string().min(3).max(100),
  photo: z.string().optional(),
});
