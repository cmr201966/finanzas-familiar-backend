import { Router } from 'express';

import { UsersModel } from '../models/users.js';
import authMiddleware from '../middleware/auth.js';

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
        if (err) return res.status(500).send(err)
        res.json(users)
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
        if (err) return res.status(500).send(err)
        res.json(user)
    })
})
