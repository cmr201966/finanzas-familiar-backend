import { Router } from 'express';

// Models
import { TipoCuentasModel } from '../models/tipocuentas.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { TipoCuentasSchema, TipoCuentaUpdateSchema } from '../schemas/tipocuentas.js';
import validator from '../middleware/validator.js';

// Router
export const TipoCuentasRouter = Router();

TipoCuentasRouter.get('/', (req, res) => {
    TipoCuentasModel.get((err, tipocuentas) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Tipo cuentas obtenidos', data: { tipocuentas: tipocuentas || [] } });
    });
});

// Obtener una cuenta por ID
TipoCuentasRouter.get('/:id', (req, res) => {
    const { id } = req.params

    TipoCuentasModel.gettipocuentaById(id, (err, tipocuenta) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Tipo cuentas obtenidos', data: { tipocuentas: tipocuentas || [] } });
    });
});

// Crear tipocuenta
TipoCuentasRouter.post('/', validator(TipoCuentasSchema), (req, res) => {
    TipoCuentasModel.create(req.body, (err, tipocuenta) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Tipo cuenta creado exitosamente', data: { tipocuenta } });
    });
});

// Modificar tipo cuenta
TipoCuentasRouter.put('/:id', validator(TipoCuentaUpdateSchema), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    TipoCuentasModel.getTipoCuentaById(id, (err, tipocuenta) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!tipocuenta) return resError(res, { status: 404, message: 'Tipo cuenta no encontrado' });

        const updatedTipoCuenta = {
            ...TipoCuenta,
            name: name || tipocuenta.name,
        };

        TiposCuentasModel.update(id, updatedTipoCuenta, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Tipo Cuenta actualizado', data: { changes } });
        });
    });
});

// Eliminar banco
TipoCuentasRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    TipoCuentasModel.getBancoById(id, (err, tipocuenta) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!tipocuenta) return resError(res, { status: 404, message: 'Tipo Cuenta no encontrado' });

        TipoCuentasModel.delete(req.params.id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Tipo cuenta eliminado', data: { changes } });
        });
    });
});