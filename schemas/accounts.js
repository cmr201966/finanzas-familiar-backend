import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const AccountSchema = z.object({
    name: z.string(),
    type: z.enum(["CUP", "MLC", "USD", "EUR"]),
    bank: z.enum(["BPA", "BANDEC", "METROPOLITANO"]),
    initial_balance: z.number().default(0),
    user_id: z.number(),
})

export const AccountUpdateSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    type: z.enum(["CUP", "MLC", "USD", "EUR"]).optional(),
    bank: z.enum(["BPA", "BANDEC", "METROPOLITANO"]).optional(),
    initial_balance: z.number().optional(),
}).partial()