import { z } from 'zod'

export const TransferenciasSchema = z.object({
  from_account_id: z.number(),
  to_account_id: z.number(),
  amount: z.number(),
  date: z.number(),
  description: z.string(),
  user_id: z.number(),
})

export const TransferenciasUpdateSchema = z.object({
  id: z.number(),
  from_account_id: z.number(),
  to_account_id: z.number(),
  amount: z.number(),
  date: z.number(),
  description: z.string(),
  user_id: z.number(),
}).partial()
