import jwt from 'jsonwebtoken';

import { Config } from '../config.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

import { UsersModel } from '../models/users.js';

export default async function authMiddleware(req, res, next) {
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
        UsersModel.getUserById(decoded.id, (err, user) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            if (!user) return resError(res, { status: 401, message: 'Usuario no encontrado', details: { message: "El usuario asociado a este token ya no existe" } });
            req.user = user;
            next();
        });
    } catch (err) {
        return resError(res, { status: 401, message: 'Token no válido', details: { message: "El token proporcionado no es válido" } });
    }
}

