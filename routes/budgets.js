import { Router } from 'express';

// Models
import { BudgetsModel } from '../models/budgets.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Schemas
import { CreateBudgetSchema, UpdateBudgetSchema } from '../schemas/budgets.js';

// Middleware
import validateSchema from '../middleware/validator.js';
import authMiddleware from '../middleware/auth.js';

// Router
export const BudgetsRouter = Router()

// Obtener todos los presupuestos del usuario
BudgetsRouter.get('/', authMiddleware, (req, res) => {
    const { id } = req.user;

    BudgetsModel.getByUserId(id, (err, budget) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Lista de presupuestos', data: budget });
    })
})

// Obtener un presupuesto específico
BudgetsRouter.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;

    BudgetsModel.getById(id, user_id, (err, budget) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!budget) return resError(res, { status: 404, message: 'Presupuesto no encontrado' });
        return resSuccess(res, { message: 'Información del presupuesto', data: budget });
    })
})

// Crear nuevo presupuesto
BudgetsRouter.post('/', authMiddleware, validateSchema(CreateBudgetSchema), (req, res) => {
    const { user_id } = req.user;
    const { category_id, amount_limit, month } = req.body;

    BudgetsModel.create(user_id, category_id, amount_limit, month, (err, budget) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuesto creado exitosamente', data: budget });
    })
})

// Actualizar presupuesto
BudgetsRouter.put('/:id', authMiddleware, validateSchema(UpdateBudgetSchema), (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;
    const { category_id, amount_limit, month } = req.body;

    BudgetsModel.update(id, user_id, category_id, amount_limit, month, (err, budget) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!budget) return resError(res, { status: 404, message: 'Presupuesto no encontrado' });
        return resSuccess(res, { message: 'Presupuesto actualizado exitosamente', data: budget });
    })
})

// Eliminar presupuesto
BudgetsRouter.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;

    BudgetsModel.delete(id, user_id, (err) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuesto eliminado exitosamente' });
    })
})
