import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const CategoriasSchema = z.object({
    amount: z.number(),
    date: z.string(),
    category: z.string(),
    concept: z.string(),
    userId: z.string(),
})