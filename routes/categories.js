import { Router } from 'express';

// Models
import { CategoriesModel } from '../models/categories.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Schemas
import { CreateCategorySchema, UpdateCategorySchema } from '../schemas/categories.js';

// Middleware
import validateSchema from '../middleware/validator.js';
import authMiddleware from '../middleware/auth.js';

// Router
export const CategoriesRouter = Router()

// Obtener todas las categorías del usuario
CategoriesRouter.get('/', authMiddleware, (req, res) => {
    const { id } = req.user;

    CategoriesModel.getByUserId(id, (err, categories) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Lista de categorías', data: categories });
    })
})

// Obtener una categoría específica
CategoriesRouter.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;

    CategoriesModel.getById(id, user_id, (err, category) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!category) return resError(res, { status: 404, message: 'Categoría no encontrada' });
        return resSuccess(res, { message: 'Información de la categoría', data: category });
    })
})

// Crear nueva categoría
CategoriesRouter.post('/', authMiddleware, validateSchema(CreateCategorySchema), (req, res) => {
    const { user_id } = req.user;
    const { name, type, description } = req.body;

    CategoriesModel.create(user_id, name, type, description, (err, category) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Categoría creada exitosamente', data: category });
    })
})

// Actualizar categoría
CategoriesRouter.put('/:id', authMiddleware, validateSchema(UpdateCategorySchema), (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;
    const { name, type, description } = req.body;

    CategoriesModel.update(id, user_id, name, type, description, (err, changes) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!changes) return resError(res, { status: 404, message: 'Categoría no encontrada' });
        return resSuccess(res, { message: 'Categoría actualizada exitosamente', data: { changes } });
    })
})

// Eliminar categoría
CategoriesRouter.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;

    CategoriesModel.delete(id, user_id, (err, changes) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Categoría eliminada exitosamente', data: { changes } });
    })
})
