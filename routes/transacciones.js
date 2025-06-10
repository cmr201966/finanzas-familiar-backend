import { Router } from 'express';

// Models
import { TransaccionesModel } from '../models/transacciones.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { TransaccionesSchema, TransaccionesUpdateSchema } from '../schemas/transacciones.js';
import validator from '../middleware/validator.js';

// Router
export const TransaccionesRouter = Router();

TransaccionesRouter.get('/', (req, res) => {
    TransaccionesModel.get((err, transacciones) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Tipo cuentas obtenidos', data: { transacciones: transacciones || [] } });
    });
});

// Obtener una cuenta por ID
TransaccionesRouter.get('/:id', (req, res) => {
    const { id } = req.params

    TransaccionesModel.getTransaccionesById(id, (err, tipocuenta) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Tipo cuentas obtenidos', data: { Transacciones: Transacciones || [] } });
    });
});

// Crear tipocuenta
TransaccionesRouter.post('/',  (req, res) => {
//    TipoCuentasRouter.post('/', validator(TipoCuentasSchema), (req, res) => {
        TransaccionesModel.create(req.body, (err, tipocuenta) => {
        if (err) return resError(res, { status: 500, message: err });
        return resSuccess(res, { message: 'Transacciones creada exitosamente', data: { Transacciones } });
    });
});

// Modificar tipo cuenta
TransaccionesRouter.put('/:id', validator(TransaccionesUpdateSchema), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    TransaccionesModel.getTransaccionesById(id, (err, transacciones) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!transacciones) return resError(res, { status: 404, message: 'Transacciones no encontrada' });

        const updatedTransacciones = {
            ...transacciones,
            amount: amount || transacciones.amount,
            type: type || transacciones.type,
            description: description || transacciones.description,
            date: date || transacciones.date,
            category_id: category_id || transacciones.category_id,
            acount_id: acount_id || transacciones.acount_id,
            user_id: user_id || transacciones.user_id,
            created_at: created_at || transacciones.created_at,
        };

        TransaccionesModel.update(id, updatedTransacciones, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Transaccion actualizada', data: { changes } });
        });
    });
});

// Eliminar banco
TransaccionesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    TransaccionesModel.getTransaccionesById(id, (err, Transaccion) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!Transaccion) return resError(res, { status: 404, message: 'Transacciones no encontrada' });

        TransaccionesModel.delete(id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Transaccion eliminada', data: { changes } });
        });
    });
});