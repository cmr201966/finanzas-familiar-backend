import { Router } from 'express';

// Models
import { UsersModel } from '../models/users.js';

// Middleware
import authMiddleware from '../middleware/auth.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Router
export const UsersRouter = Router()

UsersRouter.get('/', authMiddleware, (req, res) => {
    UsersModel.getUsers((err, users) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });

        return resSuccess(res, { message: 'Lista de usuarios', data: users });
    })
})

UsersRouter.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params
    UsersModel.getUserById(id, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Información del usuario', data: user });
    })
})
