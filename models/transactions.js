import { db } from '../db/database.js';

export const TransactionsModel = {
    // Obtener todas las transacciones de un usuario
    getByUserId: (user_id, callback) => {
        db.all(`
            SELECT t.*, 
                   c.nombre as categoria_nombre,
                   a.name as cuenta_nombre,
                   a.type as cuenta_tipo
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN accounts a ON t.account_id = a.id
            WHERE t.user_id = ?
            ORDER BY t.date DESC
        `, [user_id], function (err, rows) {
            callback(err, rows);
        });
    },

    // Obtener una transacción específica
    getById: (id, user_id, callback) => {
        db.get(`
            SELECT t.*, 
                   c.nombre as categoria_nombre,
                   a.name as cuenta_nombre,
                   a.type as cuenta_tipo
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN accounts a ON t.account_id = a.id
            WHERE t.id = ? AND t.user_id = ?
        `, [id, user_id], function (err, row) {
            callback(err, row);
        });
    },

    // Crear nueva transacción
    create: (user_id, category_id, account_id, amount, date, description, callback) => {
        db.run(`
            INSERT INTO transactions (user_id, category_id, account_id, amount, date, description) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [user_id, category_id, account_id, amount, date, description], function (err) {
            if (err) return callback(err);

            const newTransaction = {
                id: this.lastID,
                user_id,
                category_id,
                account_id,
                amount,
                date,
                description,
                created_at: new Date().toISOString()
            };

            callback(null, newTransaction);
        });
    },

    // Actualizar transacción
    update: (id, user_id, amount, date, description, callback) => {
        db.run(`UPDATE transactions SET amount = ?, date = ?, description = ? WHERE id = ? AND user_id = ?`, [amount, date, description, id, user_id], function (err) {
            callback(err, this?.changes);
        })
    },

    // Eliminar transacción
    delete: (id, user_id, callback) => {
        db.run(`
            DELETE FROM transactions 
            WHERE id = ? AND user_id = ?
        `, [id, user_id], function (err) {
            callback(err, this?.changes);
        });
    }
};
