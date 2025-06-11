import { db } from "../db/database.js";


export const TransaccionesModel = {
    create: (transaccion, callback) => {
        console.log(transaccion)
        db.run('INSERT INTO transactions (amount, type, description, date, category_id, acount_id, user_id, created_at) VALUES (?, ?, ?, ? ,?, ?, ?, ?)', 
            [transaccion.amount, transaccion.type, transaccion.description, transaccion.date, transaccion.catewgory_id, transaccion.acount_id, 
                transaccion.user_id, transaccion.ceated_at], function (err) {
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
        db.run(`UPDATE transactions SET amount = ?, type = ?, description = ?, date = ?, category_id = ?, acount_id = ?, user_id = ?, created_at = ? WHERE id = ?`, 
            [transaccion.amount, transaccion.type, transaccion.description, transaccion.date, transaccion.catewgory_id, transaccion.acount_id, transaccion.user_id, 
             transaccion.ceated_at, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}