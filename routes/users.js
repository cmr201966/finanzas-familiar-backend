import { Router } from 'express';

// Models
import { UsersModel } from '../models/users.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';
import { sanitizeUserData } from '../helpers/userDataSanitizer.js';

// Schemas
import { UpdateSchema } from '../schemas/users.js';

// Middleware
import validateSchema from '../middleware/validator.js';

// Router
export const UsersRouter = Router()

UsersRouter.get('/', (req, res) => {
    UsersModel.get((err, users) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });

        const sanitizedUsers = sanitizeUserData(users);
        return resSuccess(res, { message: 'Lista de usuarios', data: sanitizedUsers });
    })
})

UsersRouter.get('/:id', (req, res) => {
    const { id } = req.params
    UsersModel.getUserById(id, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });

        const sanitizedUser = sanitizeUserData(user);
        return resSuccess(res, { message: 'Información del usuario', data: sanitizedUser });
    })
})

UsersRouter.delete('/', (req, res) => {
    const { id } = req.user;

    UsersModel.delete(id, (err, user) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Usuario eliminado exitosamente', data: user });
    })
})

UsersRouter.put('/', validateSchema(UpdateSchema), (req, res) => {
    const user = req.user;
    const { name, password } = req.body;

    let hashPassword;
    if (password) {
        hash(password, 10, (err, hash) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            hashPassword = hash;
        });
    } else {
        hashPassword = user.password;
    }

    const updateUser = {
        ...user,
        name: name || user.name,
        password: hashPassword,
    }

    UsersModel.update(id, updateUser, (err, changes) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });

        return resSuccess(res, { message: 'Actualización exitosa', data: { changes } });
    });
});
