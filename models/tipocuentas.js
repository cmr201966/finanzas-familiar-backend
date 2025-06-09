import { db } from "../db/database.js";


export const TipoCuentasModel = {
    create: (tipocuentas, callback) => {
        db.run('INSERT INTO tipocuentas (name) VALUES (?)', [tipocuentas.name], function (err) {
            const newTipoCuentas = { id: this.lastID, ...tipocuentas };            
            callback(err, newTipoCuentas);
        });
    },

    get: (callback) => {
        db.all('SELECT * FROM tipocuentas', function (err, rows) {
            callback(err, rows);
        });
    },

    getTipoCuentasById: (id, callback) => {
        db.get(`SELECT * FROM tipocuentas WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },
    update: (id, tipocuentas, callback) => {
        db.run(`UPDATE tipocuentas SET name = ? WHERE id = ?`, [tipocuentas.name, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM tipocuentas WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}