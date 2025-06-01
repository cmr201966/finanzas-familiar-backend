import { z } from "zod"

export const CreateTransactionSchema = z.object({
    category_id: z.number().int().positive(),
    account_id: z.number().int().positive(),
    amount: z.number().positive(),
    date: z.string().datetime(),
    description: z.string().optional()
})

export const UpdateTransactionSchema = CreateTransactionSchema.partial()
