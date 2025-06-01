import { z } from "zod"

export const CreateCategorySchema = z.object({
    name: z.string().min(1),
    type: z.enum(['income', 'expense']),
    description: z.string().optional()
})

export const UpdateCategorySchema = CreateCategorySchema.partial()
