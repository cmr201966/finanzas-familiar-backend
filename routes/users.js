import { Router } from 'express';

import { UsersModel } from '../models/users.js';
import authMiddleware from '../middleware/auth.js';

export const UsersRouter = Router()

UsersRouter.get('/', authMiddleware, (req, res) => {
    UsersModel.getUsers((err, users) => {
        if (err) return res.status(500).send(err)
        res.json(users)
    })
})

UsersRouter.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params
    UsersModel.getUserById(id, (err, user) => {
        if (err) return res.status(500).send(err)
        res.json(user)
    })
})
