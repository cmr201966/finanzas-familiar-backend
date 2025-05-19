import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UsersModel } from '../models/users.js';
import { Config } from '../config.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

export const AuthRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Contraseña incorrecta
 *       500:
 *         description: Error del servidor
 */

AuthRouter.post('/login', (req, res) => {
    const { email, password } = req.body;

    UsersModel.getUserByEmail(email, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!user) return resError(res, { status: 401, message: 'Credenciales incorrectas' });

        compare(password, user.password, (err, isMatch) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });

            if (!isMatch) return resError(res, { status: 401, message: 'Credenciales incorrectas' });

            const token = jwt.sign({ id: user.id, name: user.name }, Config.secret_key_jwt, {
                expiresIn: '1h',
            });

            return resSuccess(res, { message: 'Autenticación exitosa', data: { token } });
        });
    });
});


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro exitoso
 *       400:
 *         description: Usuario ya existe
 *       500:
 *         description: Error del servidor
 */

AuthRouter.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;

    UsersModel.getUserByEmail(email, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (user) return resError(res, { status: 400, message: 'Usuario ya existe' });

        hash(password, 10, (err, hash) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });

            const newUser = { name, email, password: hash, phone };

            UsersModel.createUser(newUser, (err, user) => {
                if (err) return resError(res, { status: 500, message: 'Error del servidor' });

                const token = jwt.sign({ id: user.id, name: user.name }, Config.secret_key_jwt, {
                    expiresIn: '1h',
                });
                return resSuccess(res, { message: 'Registro exitoso', data: { token } });
            });
        });
    });
})
