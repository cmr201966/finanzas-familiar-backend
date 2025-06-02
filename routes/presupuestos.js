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
// Obtener todos los cuentas

PresupuestosRouter.get('/search/:id/:username', (req, res) => {
    const { username, id } = req.params;  
      if (username) {
        PresupuestoModel.getPresupuestosByUserName(username, (err, presupuestos) => {
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
              return resSuccess(res, { message: 'Presupuestos segun usuario', data: presupuestos });
          })
          } else if (id) {
            PresupuestoModel.getPresupuestosById(id, (err, presupuestos) => {
                if (err) return resError(res, { status: 500, message: 'Error del servidor' });
                return resSuccess(res, { message: 'Presupuestos segun ID', data: presupuestos });
            })
    
          } else {
            PresupuestoModel.getPresupuestos((err, presupuestos) => {
              if (err) return resError(res, { status: 500, message: 'Error del servidor' });
      
              return resSuccess(res, { message: 'Todos los presupuestos', data: presupuestos });
          })
          }
  });





PresupuestosRouter.get('/', (req, res) => {
    PresupuestoModel.get((err, presupuestos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuestos obtenidos', data: { presupuestos: presupuestos || [] } });
    });
});

// Obtener una cuenta por ID
PresupuestosRouter.get('/:id', (req, res) => {
    const { id } = req.params

    PresupuestoModel.getPresupuestoById(id, (err, presupuesto) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuestos obtenidos', data: { presupuesto: presupuesto || [] } });
    });
});

// Crear cuenta
PresupuestosRouter.post('/', (req, res) => {
//PresupuestosRouter.post('/', validator(PresupuestoSchema), (req, res) => {
        PresupuestoModel.create(req.body, (err, account) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Presupuesto creado exitosamente', data: { account } });
    });
});

// Modificar cuenta
PresupuestosRouter.put('/:id', validator(PresupuestoUpdateSchema), (req, res) => {
    const { id } = req.params;
    const { name, type, bank, initial_balance } = req.body;

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

// Eliminar cuenta
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