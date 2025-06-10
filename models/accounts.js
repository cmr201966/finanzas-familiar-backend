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