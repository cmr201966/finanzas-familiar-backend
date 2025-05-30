import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const BancosSchema = z.object({
    name: z.string(),
})

export const BancoUpdateSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
}).partial()