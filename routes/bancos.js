import { Router } from 'express';

// Models
import { BancosModel } from '../models/bancos.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { BancosSchema, BancoUpdateSchema } from '../schemas/bancos.js';
import validator from '../middleware/validator.js';

// Router
export const BancosRouter = Router();

BancosRouter.get('/', (req, res) => {
    BancosModel.get((err, bancos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'bancos obtenidos', data: { bancos: bancos || [] } });
    });
});

// Obtener una cuenta por ID
BancosRouter.get('/:id', (req, res) => {
    const { id } = req.params

    BancosModel.getbancoById(id, (err, banco) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'banco obtenidos', data: { banco: banco || [] } });
    });
});

// Crear banco
BancosRouter.post('/', validator(BancosSchema), (req, res) => {
    BancosModel.create(req.body, (err, banco) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Banco creado exitosamente', data: { banco } });
    });
});

// Modificar banco
BancosRouter.put('/:id', validator(BancoUpdateSchema), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    BancosModel.getBancoById(id, (err, banco) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!banco) return resError(res, { status: 404, message: 'Banco no encontrado' });

        const updatedBanco = {
            ...banco,
            name: name || banco.name,
        };

        BancosModel.update(id, updatedBanco, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Banco actualizado', data: { changes } });
        });
    });
});

// Eliminar banco
BancosRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    BancosModel.getBancoById(id, (err, banco) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!banco) return resError(res, { status: 404, message: 'Banco no encontrado' });

        bancosModel.delete(req.params.id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'banco eliminado', data: { changes } });
        });
    });
});