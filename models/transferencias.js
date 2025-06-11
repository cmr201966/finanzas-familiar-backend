import { db } from "../db/database.js";

export const TransferenciasModel = {
    create: (transferencia, callback) => {
        const [dia, mes, anio] = transferencia.date.split('/');       
        const fechaFormateada = `${anio}-${mes}-${dia}`;
        console.log(transferencia)
        db.run('INSERT INTO transfers (from_account_id, to_account_id, amount, date, description, user_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [transferencia.from_account_id, transferencia.to_account_id, transferencia.amount, fechaFormateada, transferencia.description, 
             transferencia.user_id], function (err) {
                console.log(this)
            const newTransferencia = { id: this.lastID, ...transferencia };
            callback(err, newTransferencia);
        });
    },

    get: (callback) => {
        db.all('SELECT * FROM transfers', function (err, rows) {
            callback(err, rows);
        });
    },

    getTransferenciaById: (id, callback) => {
        db.all(`SELECT * FROM transfers WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },

    update: (id, transferencia, callback) => {
        db.run(`UPDATE transfers SET from_account_id = ?, to_account_id = ?, amount = ?, date = ?, description = ?, user_id = ? WHERE id = ?`, 
            [transferencia.from_account_id, transferencia.to_account_id, transferencia.amount, transferencia.date, transferencia.description, 
             transferencia.user_id, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM transfers WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}