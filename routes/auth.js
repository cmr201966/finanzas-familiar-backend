import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UsersModel } from '../models/users.js';
import { config } from '../config.js';

export const AuthRouter = Router();

AuthRouter.post('/login', (req, res) => {
    const { email, password } = req.body;

    UsersModel.getUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send(err);

        compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send(err);

            if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

            const token = jwt.sign({ id: user.id, name: user.name }, config.secret_key_jwt, {
                expiresIn: '1h',
            });
            res.json({ token });
        });
    });
});

AuthRouter.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;

    UsersModel.getUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send(err);
        if (user) return res.status(400).json({ error: 'El usuario ya existe' });

        hash(password, 10, (err, hash) => {
            if (err) return res.status(500).send(err);

            const newUser = { name, email, password: hash, phone };

            createUser(newUser, (err, user) => {
                if (err) return res.status(500).send(err);

                const token = jwt.sign({ id: user.id, name: user.name }, config.secret_key_jwt, {
                    expiresIn: '1h',
                });
                res.json({ token });
            });
        });
    });
})
