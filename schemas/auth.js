import { z } from 'zod/v4';
import es from 'zod/v4/locales/es.js';

z.config(es())

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(50),
})

export const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(50),
    name: z.string().min(3).max(50),
    phone: z.string().min(10).max(15),
})