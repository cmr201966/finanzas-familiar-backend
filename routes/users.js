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
    console.log("Aqui")
    console.log(req.query)
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


//UsersRouter.get('/', authMiddleware, (req, res) => {
//    UsersModel.getUsers((err, users) => {
//        if (err) return resError(res, { status: 500, message: 'Error del servidor' });

//        return resSuccess(res, { message: 'Lista de usuarios', data: users });
//    })
//})


//UsersRouter.get('/id/:id', authMiddleware, (req, res) => {
//    const { id } = req.params
//    UsersModel.getUserById(id, (err, user) => {
//        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
//        return resSuccess(res, { message: 'Información del usuario', data: user });
//    })
//})

//UsersRouter.get('/username/:username', (req, res) => {
//UsersRouter.get('/:username', authMiddleware, (req, res) => {
//    const { username } = req.params
//    UsersModel.getUserByUserName(username, (err, user) => {
//        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
//        return resSuccess(res, { message: 'Información del usuario', data: user });
//    })
//})
