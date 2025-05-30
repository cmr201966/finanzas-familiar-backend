import { Router } from 'express';

// Models
import { UsersModel } from '../models/users.js';

// Middleware
import authMiddleware from '../middleware/auth.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Router
export const UsersRouter = Router()

UsersRouter.get('/search', (req, res) => {
//UsersRouter.get('/search', authMiddleware, (req, res) => {

    const { id, username } = req.query;
    if (id) {
        UsersModel.getUserById(id, (err, user) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Información del usuario', data: user });
        })
    } else if (username) {
        UsersModel.getUserByUserName(username, (err, user) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Información del usuario', data: user });
        })
        } else {
        UsersModel.getUsers((err, users) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    
            return resSuccess(res, { message: 'Lista de usuarios', data: users });
        })
        }
});

// Modificar users
UsersRouter.put('/:username', (req, res) => {
//UsersRouter.put('/:id', validator(AccountUpdateSchema), (req, res) => {
    const { username } = req.params;
    const { name, email, phone, pw } = req.body;

    UsersModel.getUserByUserName(username, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!user) return resError(res, { status: 404, message: 'User no encontrado' });

        const updatedUser = {
            ...user,
            name: name || user.name,
            phone: phone || user.type,
            email: email || user.bank,
            pw: pw || user.pw,
        };

        UsersModel.update(username, updatedUser, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'User actualizado', data: { changes } });
        });
    });
});
