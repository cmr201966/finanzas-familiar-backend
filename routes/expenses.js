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

// Obtener todas las categorias

  ExpenseRouter.get('/search/:type/:iduser', (req, res) => {
    const { type, iduser } = req.params;  
      if (type) {
        ExpenseModel.getCategoriasByType(type, iduser, (err, categorias) => {
              console.log(err)
              console.log(categorias)
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
              return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
          })
          } else {
            ExpenseModel.getCategorias((err, categorias) => {
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
      
              return resSuccess(res, { message: 'Todas las categorias', data: categorias });
          })
          }
  });
  
// Crear gasto
ExpenseRouter.post('/search/', validator(ExpenseSchema), (req, res) => {
  ExpenseModel.create(req.body, (err, id) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto creado exitosamente', data: { id } });
  });
});

// Modificar gasto
ExpenseRouter.put('/search/:id', (req, res) => {
  ExpenseModel.update(req.params.id, req.body, (err, changes) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto actualizado', data: { changes } });
  });
});

// Eliminar gasto
ExpenseRouter.delete('/search/:id', (req, res) => {
  ExpenseModel.delete(req.params.id, (err, changes) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto eliminado', data: { changes } });
  });
});

