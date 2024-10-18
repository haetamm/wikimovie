import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().trim().min(1, 'Password is required'),
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;