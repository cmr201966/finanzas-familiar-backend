import { Router } from 'express';

import { UsersModel } from '../models/users.js';
import authMiddleware from '../middleware/auth.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

export const UsersRouter = Router()


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error del servidor
 */
UsersRouter.get('/', authMiddleware, (req, res) => {
    UsersModel.getUsers((err, users) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });

        return resSuccess(res, { message: 'Lista de usuarios', data: users });
    })
})



/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Información del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
UsersRouter.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params
    UsersModel.getUserById(id, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Información del usuario', data: user });
    })
})
