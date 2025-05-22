import jwt from 'jsonwebtoken';

import { Config } from '../config.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

export default function authMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        return resError(res, { status: 401, message: 'No hay token', details: { message: "Debes autenticarte para acceder a esta ruta" } });
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
        return resError(res, { status: 401, message: 'No hay token', details: { message: "Debes autenticarte para acceder a esta ruta" } });
    }

    if (!token || token.length <= 0) {
        return resError(res, { status: 401, message: 'No hay token', details: { message: "Debes autenticarte para acceder a esta ruta" } });
    }

    try {
        const decoded = jwt.verify(token, Config.secret_key_jwt);
        req.user = decoded;
        next();
    } catch (err) {
        return resError(res, { status: 401, message: 'Token no válido', details: { message: "El token proporcionado no es válido" } });
    }
}

