import { db } from '../db/database.js';

export const BudgetsModel = {
    // Obtener todos los presupuestos de un usuario
    getByUserId: (user_id, callback) => {
        db.all(`
            SELECT b.*, c.nombre as category_name
            FROM budgets b
            LEFT JOIN category c ON b.category_id = c.id 
            WHERE b.user_id = ? 
            ORDER BY b.month DESC
        `, [user_id], function (err, rows) {
            callback(err, rows);
        });
    },

    // Obtener un presupuesto específico
    getById: (id, user_id, callback) => {
        db.get(`
            SELECT b.*, c.nombre as category_name
            FROM budgets b 
            LEFT JOIN category c ON b.category_id = c.id 
            WHERE b.id = ? AND b.user_id = ?
        `, [id, user_id], function (err, row) {
            callback(err, row);
        });
    },

    // Crear nuevo presupuesto
    create: (user_id, category_id, amount_limit, month, callback) => {
        db.run(`
            INSERT INTO presupuestos (user_id, category_id, amount_limit, month) 
            VALUES (?, ?, ?, ?)
        `, [user_id, category_id, amount_limit, month], function (err) {
            const newBudgets = {
                id: this.lastID,
                user_id,
                category_id,
                amount_limit,
                month,
                created_at: new Date().toISOString()
            };

            callback(err, newBudgets);
        });
    },

    // Actualizar presupuesto
    update: (id, user_id, amount_limit, month, callback) => {
        db.run(`UPDATE budgets SET amount_limit = ?, month = ? WHERE id = ? AND user_id = ?`, [amount_limit, month, id, user_id], function (err) {
            callback(err, this?.changes);
        });
    },

    // Eliminar presupuesto
    delete: (id, user_id, callback) => {
        db.run(`
            DELETE FROM budgets 
            WHERE id = ? AND user_id = ?
        `, [id, user_id], function (err) {
            callback(err);
        });
    }
};
