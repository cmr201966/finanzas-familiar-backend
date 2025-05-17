import jwt from 'jsonwebtoken';

import { config } from '../config.js';

export default function authMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'No hay cabecera de autorización' });
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(401).json({ error: 'Invalido tipo de token' });
    }

    if (!token || token.length <= 0) {
        return res.status(401).json({ error: 'No hay token' });
    }

    try {
        const decoded = jwt.verify(token, config.secret_key_jwt);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token no válido' });
    }
}

