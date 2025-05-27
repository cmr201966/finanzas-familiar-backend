import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const LoginSchema = z.object({
    user: z.string(),
    password: z.string(),
})

export const RegisterSchema = z.object({
    username: z.string(),
    email: z.email().optional(),
    password: z.string(),
    name: z.string(),
    phone: z.string().optional(),
}).check((ctx) => {
    if (!ctx.value.email && !ctx.value.phone) {
        ctx.issues.push({
            code: 'invalid_data',
            message: 'Debes proporcionar un email o un teléfono.',
            path: ['email', 'phone'],
        });
    }
});

export const UpdateSchema = z.object({
    name: z.string().optional(),
    password: z.string().optional(),
}).refine(data => data.name || data.password, {
    message: 'Debes proporcionar al menos un campo para actualizar',
    path: ['name', 'password']
});