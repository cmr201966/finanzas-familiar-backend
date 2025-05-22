import { Router } from 'express';

// Models
import { ExpenseModel } from '../models/expense.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { ExpenseSchema } from '../schemas/expenses.js';
import validator from '../middleware/validator.js';

// Router
export const ExpenseRouter = Router();

// Obtener todos los gastos
ExpenseRouter.get('/', (req, res) => {
  ExpenseModel.get((err, expenses) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gastos obtenidos', data: { expenses: expenses || [] } });
  });
});

// Obtener un gasto por ID
ExpenseRouter.get('/:id', (req, res) => {
  const { id } = req.params

  ExpenseModel.getById(id, (err, expense) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto obtenido', data: { expense: expense || [] } });
  });
});

// Crear gasto
ExpenseRouter.post('/', validator(ExpenseSchema), (req, res) => {
  ExpenseModel.create(req.body, (err, id) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto creado exitosamente', data: { id } });
  });
});

// Modificar gasto
ExpenseRouter.put('/:id', (req, res) => {
  ExpenseModel.update(req.params.id, req.body, (err, changes) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto actualizado', data: { changes } });
  });
});

// Eliminar gasto
ExpenseRouter.delete('/:id', (req, res) => {
  ExpenseModel.delete(req.params.id, (err, changes) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto eliminado', data: { changes } });
  });
});

