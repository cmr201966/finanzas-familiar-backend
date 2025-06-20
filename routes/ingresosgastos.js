import { Router } from 'express';

// Models
import { IngresosGastosModel } from '../models/ingresosgastos.js';

// Helpers
import { resSuccess, resError } from '../helpers/response.js';

// Router
export const IngresosGastosRouter = Router();

IngresosGastosRouter.get('/', (req, res) => {
    IngresosGastosModel.get((err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas', data: { ingresosgastos: ingresosgastos || [] } });
    });
});

// Obtener las ingreso/gasto por id
IngresosGastosRouter.get('/id/:id', (req, res) => {
    const { id } = req.params
    IngresosGastosModel.getingresosgastosById(id, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por id', data: { ingresosgastos: ingresosgastos || [] } });
    });
});


// Obtener las ingreso/gasto por categoria
IngresosGastosRouter.get('/categoria/:id', (req, res) => {
    const { id } = req.params
    IngresosGastosModel.getingresosgastosByCategoria(id, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por categoria', data: { ingresosgastos: ingresosgastos || [] } });
    });
});


// Obtener las ingreso/gasto por cuenta
IngresosGastosRouter.get('/account/:id', (req, res) => {
    const { idaccount } = req.params
    IngresosGastosModel.getIngresosGastosByAccount(idaccount, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por cuenta', data: { ingresosgastos: ingresosgastos || [] } });
    });
});

// Obtener las ingreso/gasto por usuario
IngresosGastosRouter.get('/user/:id', (req, res) => {
    const { iduser } = req.params
    IngresosGastosModel.getingresosgastosByUser(iduser, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por usuario', data: { ingresosgastos: ingresosgastos || [] } });
    });
});

// Obtener las ingreso/gasto por categoria/usuario
IngresosGastosRouter.get('/categoria/user/:idcategoria/:iduser', (req, res) => {
    const { idcategoria } = req.params
    const { iduser } = req.params
    IngresosGastosModel.getingresosgastosByCategoriaUsuario(idcategoria, iduser, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por categoria/usuario', data: { ingresosgastos: ingresosgastos || [] } });
    });
});

// Obtener las ingreso/gasto por categoria/account
IngresosGastosRouter.get('/categoria/account/:idcategoria/:idaccount', (req, res) => {
    const { idcategoria } = req.params
    const { idaccount } = req.params
    IngresosGastosModel.getingresosgastosByCategoriaAccount(idcategoria, idaccount, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por categoria/cuenta', data: { ingresosgastos: ingresosgastos || [] } });
    });
});

// Obtener las ingreso/gasto por account/usuario
IngresosGastosRouter.get('/account/usuario/:idaccount/:iduser', (req, res) => {
    const { iduser } = req.params
    const { idaccount } = req.params
    IngresosGastosModel.getingresosgastosByAccountUser(idaccount, iduser, (err, ingresosgastos) => {
        if (err) return resError(res, { status: 500, message: 'Error del servidor' });
        return resSuccess(res, { message: 'Ingresos/Gastos obtenidas por cuenta/usuario', data: { ingresosgastos: ingresosgastos || [] } });
    });
});

