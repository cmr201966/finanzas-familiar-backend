import { Router } from 'express';

// Models
import { AccountsModel } from '../models/accounts.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Validators
import { AccountSchema, AccountUpdateSchema } from '../schemas/accounts.js';
import validator from '../middleware/validator.js';

// Router
export const AccountsRouter = Router();

// Obtener todos los cuentas
AccountsRouter.get('/', (req, res) => {
    AccountsModel.get((err, accounts) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Cuentas obtenidas', data: { accounts: accounts || [] } });
    });
});

// Obtener una cuenta por ID
AccountsRouter.get('/:id', (req, res) => {
    const { id } = req.params

    AccountsModel.getAccountById(id, (err, account) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Cuenta obtenida', data: { account: account || [] } });
    });
});

// Crear cuenta
AccountsRouter.post('/', validator(AccountSchema), (req, res) => {
    AccountsModel.create(req.body, (err, account) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Cuenta creada exitosamente', data: { account } });
    });
});

// Modificar cuenta
AccountsRouter.put('/:id', validator(AccountUpdateSchema), (req, res) => {
    const { id } = req.params;
    const { name, type, bank, initial_balance } = req.body;

    AccountsModel.getAccountById(id, (err, account) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!account) return resError(res, { status: 404, message: 'Cuenta no encontrada' });

        const updatedAccount = {
            ...account,
            name: name || account.name,
            type: type || account.type,
            bank: bank || account.bank,
            initial_balance: initial_balance || account.initial_balance,
        };

        AccountsModel.update(id, updatedAccount, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Cuenta actualizada', data: { changes } });
        });
    });
});

// Eliminar cuenta
AccountsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    AccountsModel.getAccountById(id, (err, account) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        if (!account) return resError(res, { status: 404, message: 'Cuenta no encontrada' });

        AccountsModel.delete(req.params.id, (err, changes) => {
            if (err) return resError(res, { status: 500, message: 'Error del servidor' });
            return resSuccess(res, { message: 'Cuenta eliminada', data: { changes } });
        });
    });
});