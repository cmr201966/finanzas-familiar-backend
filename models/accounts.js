import { db } from "../db/database.js";


export const AccountsModel = {
    create: (account, callback) => {
        db.run('INSERT INTO accounts (name, type, bank, initial_balance, user_id) VALUES (?, ?, ?, ?, ?)', [account.name, account.type, account.bank, account.initial_balance, account.user_id], function (err) {
            const newAccount = { id: this.lastID, ...account };
            callback(err, newAccount);
        });
    },
    get: (callback) => {
        db.all('SELECT * FROM accounts', function (err, rows) {
            callback(err, rows);
        });
    },
    getAccountById: (id, callback) => {
        db.all(`SELECT * FROM accounts WHERE user_id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },
    getAccountByUserId: (userId, callback) => {
        db.all(`SELECT * FROM accounts WHERE user_id = ?`, [userId], function (err, rows) {
            callback(err, rows);
        });
    },
    getAccountsSaldos: ( callback) => {
        db.all("SELECT a.id AS account_id, a.initial_balance + COALESCE(t_ingresos.total_ingresos, 0) - COALESCE(t_gastos.total_gastos, 0) + COALESCE(trf_entrantes.total_recibido, 0) - COALESCE(trf_salientes.total_enviado, 0) AS saldo_final FROM accounts a LEFT JOIN (SELECT account_id, SUM(amount) AS total_ingresos FROM transactions WHERE type = 'ingreso' GROUP BY account_id) t_ingresos ON t_ingresos.account_id = a.id LEFT JOIN (SELECT account_id, SUM(amount) AS total_gastos FROM transactions WHERE type = 'gasto' GROUP BY account_id) t_gastos ON t_gastos.account_id = a.id LEFT JOIN (SELECT to_account_id AS account_id, SUM(amount) AS total_recibido FROM transfers GROUP BY to_account_id) trf_entrantes ON trf_entrantes.account_id = a.id LEFT JOIN (SELECT from_account_id  AS account_id, SUM(amount) AS total_enviado FROM transfers GROUP BY from_account_id ) trf_salientes ON trf_salientes.account_id = a.id"
        , [], function (err, row) {
            callback(err, row);
        });
    },


    update: (id, account, callback) => {
        db.run(`UPDATE accounts SET name = ?, type = ?, bank = ?, initial_balance = ? WHERE id = ?`, [account.name, account.type, account.bank, account.initial_balance, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM accounts WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}