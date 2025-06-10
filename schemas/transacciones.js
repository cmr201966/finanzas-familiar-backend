import { z } from 'zod'

export const TransaccionesSchema = z.object({
  amount: z.number(),
  type: z.string(),
  description: z.string(),
  date: z.number(),
  category_id: z.number(),
  acount_id: z.number(),
  user_id: z.number(),
  created_at: z.string().optional(), 
})

export const TransaccionesUpdateSchema = z.object({
  id: z.number(),
  amount: z.number(),
  type: z.string(),
  description: z.string(),
  date: z.number(),
  category_id: z.number(),
  acount_id: z.number(),
  user_id: z.number(),
  created_at: z.string().optional(), 
}).partial()
