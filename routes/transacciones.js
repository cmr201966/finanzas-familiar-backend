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

    TransaccionesModel.getTransaccionById(id, (err, transacciones) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Tipo cuentas obtenidos', data: { transacciones: transacciones || [] } });
    });
});

// Crear tipocuenta
TransaccionesRouter.post('/',  (req, res) => {
//    TipoCuentasRouter.post('/', validator(TipoCuentasSchema), (req, res) => {
        TransaccionesModel.create(req.body, (err, transaccion) => {
        if (err) return resError(res, { status: 500, message: err });
        return resSuccess(res, { message: 'Transacciones creada exitosamente', data: { transaccion } });
    });
});

// Modificar tipo cuenta
//TransaccionesRouter.put('/:id', validator(TransaccionesUpdateSchema), (req, res) => {
TransaccionesRouter.put('/:id',  (req, res) => {
    const { id } = req.params;
    const { amount, type, description, date, category_id, account_id, user_id, created_at } = req.body;

    TransaccionesModel.getTransaccionById(id, (err, transacciones) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!transacciones) return resError(res, { status: 404, message: 'Transacciones no encontrada' });
        console.log(req.body)
        const updatedTransacciones = {
            ...transacciones,
            amount: amount || transacciones.amount,
            type: type || transacciones.type,
            description: description || transacciones.description,
            date: date || transacciones.date,
            category_id: category_id || transacciones.category_id,
            account_id: account_id || transacciones.account_id,
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
    TransaccionesModel.getTransaccionById(id, (err, Transaccion) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!Transaccion) return resError(res, { status: 404, message: 'Transaccione no encontrada' });

        TransaccionesModel.delete(id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Transaccion eliminada', data: { changes } });
        });
    });
});