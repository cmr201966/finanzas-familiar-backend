import { z } from 'zod'

export const AccountSchema = z.object({
  name: z.string(),
  type: z.string(),
  bank: z.string(),
  initial_balance: z.number().default(0),
  user_id: z.number(),
  created_at: z.string().optional(),     // Incluye si viene desde frontend
  main_account: z.boolean().optional(),
  notifications: z.boolean().optional(),
})

export const AccountUpdateSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  type: z.string().optional(),
  bank: z.string().optional(),
  initial_balance: z.number().optional(),
}).partial()
