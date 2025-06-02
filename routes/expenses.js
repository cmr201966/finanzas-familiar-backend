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

ExpenseRouter.get('/', (req, res) => {
  ExpenseModel.getCategorias((err, categorias) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });   
       return resSuccess(res, { message: 'Todas las categorias', data: categorias });
    })
});

ExpenseRouter.get('/search/type/:type', (req, res) => {
    const { type } = req.params;
      if (type) {
        ExpenseModel.getCategoriasByType(type, iduser, (err, categorias) => {
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
              return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
          })
        }
  });
  
ExpenseRouter.get('/search/userid/:iduser', (req, res) => {
  const {iduser } = req.params;
    if (iduser) {
      ExpenseModel.getCategoriasByType(type, iduser, (err, categorias) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
        })
      }
});

ExpenseRouter.get('/search/typeiduser/:type/:iduser', (req, res) => {
  const { type, iduser } = req.params;
    if (type && iduser) {
      ExpenseModel.getCategoriasByType(type, iduser, (err, categorias) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
        })
      }
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

