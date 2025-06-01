import { z } from "zod"


export const UpdateSchema = z.object({
    name: z.string().optional(),
    password: z.string().optional(),
}).refine(data => data.name || data.password, {
    message: 'Debes proporcionar al menos un campo para actualizar',
    path: ['name', 'password']
});
