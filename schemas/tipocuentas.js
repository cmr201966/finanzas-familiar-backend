import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const TipoCuentasSchema = z.object({
    name: z.string(),
})

export const TipoCuentaUpdateSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
}).partial()