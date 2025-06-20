import { Router } from 'express';

// Models
import { TransferenciasModel } from '../models/transferencias.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { TransferenciasSchema, TransferenciasUpdateSchema } from '../schemas/transferencias.js';
import validator from '../middleware/validator.js';

// Router
export const TransferenciasRouter = Router();

TransferenciasRouter.get('/', (req, res) => {
    TransferenciasModel.get((err, transferencias) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Transferencias obtenidas', data: { transferencias: transferencias || [] } });
    });
});

// Obtener las transferencias por id
TransferenciasRouter.get('/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    TransferenciasModel.getTransferenciaById(id, (err, transferencias) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Transferencias obtenidas por id', data: { transferencias: transferencias || [] } });
    });
});


// Crear una transferencia
TransferenciasRouter.post('/',  (req, res) => {
//    TipoCuentasRouter.post('/', validator(TipoCuentasSchema), (req, res) => {
    console.log(req.body)
    TransferenciasModel.create(req.body, (err, transferencia) => {
        if (err) return resError(res, { status: 500, message: err });
        return resSuccess(res, { message: 'Transacciones creada exitosamente', data: { transferencia } });
    });
});

// Modificar una transferencia
//TransferenciasRouter.put('/:id', validator(TransferenciasUpdateSchema), (req, res) => {
TransferenciasRouter.put('/:id',  (req, res) => {
        const { id } = req.params;
    const { name } = req.body;

    TransferenciasModel.getTransaccionesById(id, (err, transferencia) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!transferencia) return resError(res, { status: 404, message: 'Transacciones no encontrada' });

        const updatedTransferencia = {
            ...transferencia,
            from_account_id: from_account_id || transferencia.from_account_id,
            to_account_id:   to_account_id || transferencia.to_account_id,
            amount:          amount || transferencia.amount,
            date:            date || transferencia.date,
            description:     description || transferencia.description,
            user_id:         user_id || transferencia.user_id,
        };

        TransferenciasModel.update(id, updatedTransferencia, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Transferencia actualizada', data: { changes } });
        });
    });
});

// Eliminar banco
TransferenciasRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    TransferenciasModel.getTransferenciaById(id, (err, transferencia) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!transferencia) return resError(res, { status: 404, message: 'Transferencia no encontrada' });

        TransferenciasModel.delete(id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Transferencia eliminada', data: { changes } });
        });
    });
});