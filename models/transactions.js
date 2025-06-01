import { db } from '../db/database.js';

export const TransactionsModel = {
    // Obtener todas las transacciones de un usuario
    getByUserId: (usuario_id, callback) => {
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
        `, [usuario_id], function (err, rows) {
            callback(err, rows);
        });
    },

    // Obtener una transacción específica
    getById: (id, usuario_id, callback) => {
        db.get(`
            SELECT t.*, 
                   c.nombre as categoria_nombre,
                   a.name as cuenta_nombre,
                   a.type as cuenta_tipo
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN accounts a ON t.account_id = a.id
            WHERE t.id = ? AND t.user_id = ?
        `, [id, usuario_id], function (err, row) {
            callback(err, row);
        });
    },

    // Crear nueva transacción
    create: (usuario_id, category_id, account_id, amount, date, description, callback) => {
        db.run(`
            INSERT INTO transactions (user_id, category_id, account_id, amount, date, description) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [usuario_id, category_id, account_id, amount, date, description], function (err) {
            if (err) return callback(err);
            
            const nuevaTransaccion = {
                id: this.lastID,
                user_id: usuario_id,
                category_id,
                account_id,
                amount,
                date,
                description,
                created_at: new Date().toISOString()
            };
            
            callback(null, nuevaTransaccion);
        });
    },

    // Actualizar transacción
    update: (id, usuario_id, category_id, account_id, amount, date, description, callback) => {
        db.get(`SELECT * FROM transactions WHERE id = ? AND user_id = ?`, [id, usuario_id], function (err, row) {
            if (err) return callback(err);
            if (!row) return callback(null, null);

            const updateFields = [];
            const values = [];

            if (category_id !== undefined) {
                updateFields.push('category_id = ?');
                values.push(category_id);
            }
            if (account_id !== undefined) {
                updateFields.push('account_id = ?');
                values.push(account_id);
            }
            if (amount !== undefined) {
                updateFields.push('amount = ?');
                values.push(amount);
            }
            if (date !== undefined) {
                updateFields.push('date = ?');
                values.push(date);
            }
            if (description !== undefined) {
                updateFields.push('description = ?');
                values.push(description);
            }

            if (updateFields.length === 0) {
                return callback(null, row);
            }

            const query = `UPDATE transactions SET ${updateFields.join(', ')} WHERE id = ? AND user_id = ?`;
            values.push(id, usuario_id);

            db.run(query, values, function (err) {
                if (err) return callback(err);
                
                const updatedTransaccion = {
                    ...row,
                    ...(category_id !== undefined && { category_id }),
                    ...(account_id !== undefined && { account_id }),
                    ...(amount !== undefined && { amount }),
                    ...(date !== undefined && { date }),
                    ...(description !== undefined && { description }),
                    updated_at: new Date().toISOString()
                };
                
                callback(null, updatedTransaccion);
            });
        });
    },

    // Eliminar transacción
    delete: (id, usuario_id, callback) => {
        db.run(`
            DELETE FROM transactions 
            WHERE id = ? AND user_id = ?
        `, [id, usuario_id], function (err) {
            callback(err);
        });
    }
};
