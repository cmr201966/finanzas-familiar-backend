import { db } from "../db/database.js";


export const TransaccionesModel = {
    create: (transaccion, callback) => {
        db.run('INSERT INTO transactions (amount, type, description, date, category_id, acount_id, user_id, created_at) VALUES (?)', [tipocuentas.amount, tipocuentas.type, tipocuentas.description, tipocuentas.date, tipocuentas.catewgory_id, tipocuentas.acount_id, tipocuentas.user_id, tipocuentas.ceated_at], function (err) {
            const newTransaccion = { id: this.lastID, ...transaccion };
            callback(err, newTransaccion);
        });
    },

    get: (callback) => {
        db.all('SELECT * FROM transactions', function (err, rows) {
            callback(err, rows);
        });
    },

    getTransaccionById: (id, callback) => {
        db.get(`SELECT * FROM transactions WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },
    update: (id, transaccion, callback) => {
        db.run(`UPDATE transactions SET amount = ?, type = ?, description = ?, date = ?, category_id = ?, acount_id = ?, user_id = ?, created_at = ? WHERE id = ?`, [tipocuentas.amount, tipocuentas.type, tipocuentas.description, tipocuentas.date, tipocuentas.catewgory_id, tipocuentas.acount_id, tipocuentas.user_id, tipocuentas.ceated_at, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}