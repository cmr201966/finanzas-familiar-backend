import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const PresupuestoSchema = z.object({
    usuario_id: z.number().default(0),
    categoria_id: z.number().default(0),
    monto_limite: z.number().default(0),
    mes: z.number().default(0),
    creado_en: z.string().optional(),
})

export const PresupuestoUpdateSchema = z.object({
    id: z.number(),
    usuario_id: z.number().default(0),
    categoria_id: z.number().default(0),
    monto_limite: z.number().default(0),
    mes: z.number().default(0),
    creado_en: z.string().optional(),
}).partial()