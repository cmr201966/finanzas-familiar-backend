import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const LoginSchema = z.object({
    email: z.email().optional(),
    phone: z.string().optional(),
    username: z.string().optional(),
    password: z.string(),
}).check((ctx) => {

    const presentFields = ["email", "phone", "username"].filter(field => ctx.value[field]);

    if (presentFields.length === 0) {
        ctx.issues.push({
            code: 'invalid_data',
            message: 'Debes proporcionar un email, un teléfono o un username.',
            path: ['email', 'phone', 'username'],
        });
    }
});;

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