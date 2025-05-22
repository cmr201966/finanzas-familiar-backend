import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UsersModel } from '../models/users.js';
import { Config } from '../config.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Schemas
import { LoginSchema, RegisterSchema } from '../schemas/auth.js';

// Middleware
import validateSchema from '../middleware/validator.js';

export const AuthRouter = Router();

AuthRouter.post('/login', validateSchema(LoginSchema), (req, res) => {
    const { username, email, phone, password } = req.body;

    const findUserBy = () => {
        if (username) return { identifier: username, getUserFn: UsersModel.getUserByUsername };
        if (email) return { identifier: email, getUserFn: UsersModel.getUserByEmail };
        if (phone) return { identifier: phone, getUserFn: UsersModel.getUserByPhone };
    };

    const { identifier, getUserFn } = findUserBy();

    getUserFn(identifier, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!user) return resError(res, { status: 401, message: 'Credenciales incorrectas' });

        compare(password, user.password, (err, isMatch) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            if (!isMatch) return resError(res, { status: 401, message: 'Credenciales incorrectas' });

            const token = jwt.sign({ id: user.id, name: user.name }, Config.secret_key_jwt, {
                expiresIn: '1h',
            });

            return resSuccess(res, {
                message: 'Autenticación exitosa',
                data: { token },
            });
        });
    });
});

AuthRouter.post('/register', validateSchema(RegisterSchema), (req, res) => {
    const { username, name, email, password, phone } = req.body;

    const findUserBy = () => {
        if (email) return { identifier: email, getUserFn: UsersModel.getUserByEmail };
        if (phone) return { identifier: phone, getUserFn: UsersModel.getUserByPhone };
    };

    const { identifier, getUserFn } = findUserBy();

    getUserFn(identifier, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (user) return resError(res, { status: 400, message: 'Ya existe un usuario con esas credenciales' });

        hash(password, 10, (err, hash) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });

            const newUser = { username, name, email, password: hash, phone };

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