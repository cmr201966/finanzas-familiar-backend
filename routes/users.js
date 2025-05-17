const express = require('express');
const router = express.Router()
const Users = require('../models/users')
const auth = require('../middleware/auth')


router.get('/', auth, (req, res) => {
    Users.getUsers((err, users) => {
        if (err) return res.status(500).send(err)
        res.json(users)
    })
})

router.get('/:id', auth, (req, res) => {
    const { id } = req.params
    Users.getUserById(id, (err, user) => {
        if (err) return res.status(500).send(err)
        res.json(user)
    })
})

module.exports = router