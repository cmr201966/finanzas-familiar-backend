import { db } from "../db/database.js";


export const BancosModel = {
    create: (banco, callback) => {
        db.run('INSERT INTO bancos (name) VALUES (?)', [banco.name], function (err) {
            const newBanco = { id: this.lastID, ...banco };
            callback(err, newBanco);
        });
    },

    get: (callback) => {
        db.all('SELECT * FROM bancos', function (err, rows) {
            callback(err, rows);
        });
    },

    bancoUsado: (id, callback) => {
        db.get(`SELECT * FROM bancos, accounts WHERE (bancos.id=?) and (bancos.name=accounts.bank)`, [id], function (err, row) {
            callback(err, row);
        });
    },

    getBancoById: (id, callback) => {
        db.get(`SELECT * FROM bancos WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },
    update: (id, banco, callback) => {
        db.run(`UPDATE bancos SET name = ? WHERE id = ?`, [banco.name, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM bancos WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}