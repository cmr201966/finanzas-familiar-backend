import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const RegisterSchema = z.object({
    email: z.email(),
    password: z.string(),
    name: z.string(),
    phone: z.string(),
})