import { Router } from 'express';

// Models
import { CategoriasModel } from '../models/categorias.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { CategoriasSchema } from '../schemas/categorias.js';
import validator from '../middleware/validator.js';

// Router
export const CategoriasRouter = Router();

CategoriasRouter.get('/', (req, res) => {
  CategoriasModel.getCategorias((err, categorias) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });   
       return resSuccess(res, { message: 'Todas las categorias', data: categorias });
    })
});

CategoriasRouter.get('/search/type/:type', (req, res) => {
    const { type } = req.params;
      if (type) {
        CategoriasModel.getCategoriasByType(type, iduser, (err, categorias) => {
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
              return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
          })
        }
  });
  
  CategoriasRouter.get('/search/userid/:iduser', (req, res) => {
  const {iduser } = req.params;
    if (iduser) {
      CategoriasModel.getCategoriasByType(type, iduser, (err, categorias) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
        })
      }
});

CategoriasRouter.get('/search/typeiduser/:type/:iduser', (req, res) => {
  const { type, iduser } = req.params;
    if (type && iduser) {
      CategoriasModel.getCategoriasByType(type, iduser, (err, categorias) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Categorias segun tipo', data: categorias });
        })
      }
});

// Crear categoria
CategoriasRouter.post('/', (req, res) => {
  console.log('Datos recibidos:', req.body)
  CategoriasModel.create(req.body, (err, id) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto creado exitosamente', data: { id } });
  });
});

// Modificar categoria
CategoriasRouter.put('/:id', (req, res) => {
  CategoriasModel.update(req.params.id, req.body, (err, changes) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto actualizado', data: { changes } });
  });
});

// Eliminar categoria
CategoriasRouter.delete('/:id', (req, res) => {
  CategoriasModel.delete(req.params.id, (err, changes) => {
    if (err) return resError(res, { status: 500, message: 'Error del servidor' });
    return resSuccess(res, { message: 'Gasto eliminado', data: { changes } });
  });
});

