import { Router } from 'express';

// Models
import { TransactionsModel } from '../models/transactions.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Schemas
import { CreateTransactionSchema, UpdateTransactionSchema } from '../schemas/transactions.js';

// Middleware
import validateSchema from '../middleware/validator.js';
import authMiddleware from '../middleware/auth.js';

// Router
export const TransactionsRouter = Router()

// Obtener todas las transacciones del usuario
TransactionsRouter.get('/', authMiddleware, (req, res) => {
    const { id } = req.user;

    TransactionsModel.getByUserId(id, (err, transactions) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Lista de transacciones', data: transactions });
    })
})

// Obtener una transacción específica
TransactionsRouter.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;

    TransactionsModel.getById(id, user_id, (err, transaction) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!transaction) return resError(res, { status: 404, message: 'Transacción no encontrada' });
        return resSuccess(res, { message: 'Información de la transacción', data: transaction });
    })
})

// Crear nueva transacción
TransactionsRouter.post('/', authMiddleware, validateSchema(CreateTransactionSchema), (req, res) => {
    const { user_id } = req.user;
    const { category_id, account_id, amount, date, description } = req.body;

    TransactionsModel.create(user_id, category_id, account_id, amount, date, description, (err, transaction) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Transacción creada exitosamente', data: transaction });
    })
})

// Actualizar transacción
TransactionsRouter.put('/:id', authMiddleware, validateSchema(UpdateTransactionSchema), (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;
    const { category_id, account_id, amount, date, description } = req.body;

    TransactionsModel.update(id, user_id, category_id, account_id, amount, date, description, (err, changes) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!changes) return resError(res, { status: 404, message: 'Transacción no encontrada' });
        return resSuccess(res, { message: 'Transacción actualizada exitosamente', data: { changes } });
    })
})

// Eliminar transacción
TransactionsRouter.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { user_id } = req.user;

    TransactionsModel.delete(id, user_id, (err, changes) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Transacción eliminada exitosamente', data: { changes } });
    })
})
