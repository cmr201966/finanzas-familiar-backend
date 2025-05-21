import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const ExpenseSchema = z.object({
    amount: z.number().min(0).max(10000),
    date: z.date(),
    category: z.string().min(3).max(50),
    concept: z.string().min(3).max(50),
    userId: z.string().min(3).max(50),
})