import { db } from "../db/database.js";

export const IngresosGastosModel = {

    get: (callback) => {
        db.all('SELECT * FROM transactions', function (err, rows) {
            callback(err, rows);
        });
    },

    getIngresosGastosById: (id, callback) => {
        db.all(`SELECT * FROM transactions WHERE user_id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },

    getIngresosGastosByCategoria: (idcategoria, callback) => {
        db.all(`SELECT * FROM transactions WHERE category_id = ?`, [idcategoria], function (err, row) {
            callback(err, row);
        });
    },

    getIngresosGastosByAccount: (idaccount, callback) => {
        db.all(`SELECT * FROM transactions WHERE account_id = ?`, [idaccount], function (err, row) {
            callback(err, row);
        });
    },

    getingresosgastosByUser: (iduser, callback) => {
        db.all(`SELECT * FROM transactions WHERE user_id = ?`, [iduser], function (err, row) {
            callback(err, row);
        });
    },
 
    getingresosgastosByCategoriaUsuario: (idcategoria, iduser, callback) => {
        db.all(`SELECT * FROM transactions WHERE category_id = ? and user_id = ?`, [idcategoria, iduser], function (err, row) {
            callback(err, row);
        });
    },
 
    getingresosgastosByAccountUser: (idaccount, iduser, callback) => {
        db.all(`SELECT * FROM transactions WHERE account_id = ? and user_id = ?`, [idaccount, iduser], function (err, row) {
            callback(err, row);
        });
    },
     
}