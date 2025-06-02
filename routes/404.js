import { Router } from 'express';

// Helpers
import { resError } from '../helpers/response.js';

export const NotFoundRouter = Router();

NotFoundRouter.use((req, res) => {
    console.log(req)
    resError(res, { status: 404, message: 'No se encontró la ruta', details: { message: "La ruta solicitada no existe" } });
});