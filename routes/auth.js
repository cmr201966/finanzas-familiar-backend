const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    Users.getUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send(err);

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send(err);

            if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

            const token = jwt.sign({ id: user.id, name: user.name }, config.secret_key_jwt, {
                expiresIn: '1h',
            });
            res.json({ token });
        });
    });
});

router.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;

    Users.getUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send(err);
        if (user) return res.status(400).json({ error: 'El usuario ya existe' });

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).send(err);

            const newUser = { name, email, password: hash, phone };

            Users.createUser(newUser, (err, user) => {
                if (err) return res.status(500).send(err);

                const token = jwt.sign({ id: user.id, name: user.name }, config.secret_key_jwt, {
                    expiresIn: '1h',
                });
                res.json({ token });
            });
        });
    });
})

module.exports = router;