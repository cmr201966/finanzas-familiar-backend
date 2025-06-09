import { Router } from 'express';

// Models
import { PresupuestoModel } from '../models/presupuesto.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { PresupuestoSchema, PresupuestoUpdateSchema } from '../schemas/presupuesto.js';
import validator from '../middleware/validator.js';

// Router
export const PresupuestosRouter = Router();

// Obtener todos los presupuestos
PresupuestosRouter.get('/', (req, res) => {
    PresupuestoModel.getPresupuestos((err, presupuestos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuestos obtenidos', data: { presupuestos: presupuestos || [] } });
    });
});

// Obtener los presupuestos de un username
PresupuestosRouter.get('/username/:username', (req, res) => {
    const { username, categoria } = req.params;  
      if (username) {
        PresupuestoModel.getPresupuestosByUserName(username, (err, presupuestos) => {
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
              return resSuccess(res, { message: 'Presupuestos segun usuario', data: presupuestos });
          })
    
          } 
  });

// Obtener un presupuesto por ID
PresupuestosRouter.get('/id/:id', (req, res) => {
    const { id } = req.params
    if (id) {
        PresupuestoModel.getPresupuestoById(id, (err, presupuesto) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuestos obtenidos', data: { presupuesto: presupuesto || [] } });
    });
  }
});

// Crear presupuesto
PresupuestosRouter.post('/', (req, res) => {
    PresupuestoModel.create(req.body, (err, account) => {
      if (err) {
        return resError(res, {
          status: 500,
          message: 'Error al crear presupuesto',
          error: err.message || err
        });
      }
  
      return resSuccess(res, {
        message: 'Presupuesto creado exitosamente',
        data: { account }
      });
    });
  });
  

//PresupuestosRouter.post('/', (req, res) => {
//        PresupuestoModel.create(req.body, (err, account) => {
//        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
//        return resSuccess(res, { message: 'Presupuesto creado exitosamente', data: { account } });
//    });
//});

// Modificar un presupuesto
PresupuestosRouter.put('/', validator(PresupuestoUpdateSchema), (req, res) => {
    const { id, usuario_id, categoria_id, monto_limite, mes, creado_en } = req.body;

    PresupuestoModel.getPresupuestoById(id, (err, presupuesto) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!presupuesto) return resError(res, { status: 404, message: 'Presupuesto no encontrada' });
        const updatedPresupuesto = {
            ...presupuesto,
            usuario_id: usuario_id || presupuesto.usuario_id,
            categoria_id: categoria_id || presupuesto.categoria_id,
            monto_limite: monto_limite || presupuesto.monto_limite,
            mes: mes || presupuesto.mes,
            creado_en: creado_en || presupuesto.creado_en,
        };
        PresupuestoModel.update(id, updatedPresupuesto, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Presupuesto actualizado', data: { changes } });
        });
    });
});

// Eliminar un presupuesto
PresupuestosRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    PresupuestoModel.getPresupuestoById(id, (err, presupuesto) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!presupuesto) return resError(res, { status: 404, message: 'Presupuesto no encontrado' });

        PresupuestoModel.delete(req.params.id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Presupuesto eliminado', data: { changes } });
        });
    });
});