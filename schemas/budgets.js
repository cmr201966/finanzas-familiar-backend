import { z } from "zod"

export const CreateBudgetSchema = z.object({
    category_id: z.number().int().positive(),
    amount_limit: z.number().positive(),
    month: z.string().min(1).max(7), // Formato YYYY-MM
})

export const UpdateBudgetSchema = CreateBudgetSchema.partial()
