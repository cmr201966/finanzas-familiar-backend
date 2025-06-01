import { db } from '../db/database.js';

export const CategoriesModel = {
    // Obtener todas las categorías de un usuario
    getByUserId: (user_id, callback) => {
        db.all(`
            SELECT * 
            FROM categories 
            WHERE user_id = ? 
            ORDER BY type, name
        `, [user_id], function (err, rows) {
            callback(err, rows);
        });
    },

    // Obtener una categoría específica
    getById: (id, user_id, callback) => {
        db.get(`
            SELECT * 
            FROM categories 
            WHERE id = ? AND user_id = ?
        `, [id, user_id], function (err, row) {
            callback(err, row);
        });
    },

    // Crear nueva categoría
    create: (user_id, name, type, description, callback) => {
        db.run(`
            INSERT INTO categories (user_id, name, type, description) 
            VALUES (?, ?, ?, ?)
        `, [user_id, name, type, description], function (err) {
            if (err) return callback(err);

            const newCategory = {
                id: this.lastID,
                user_id,
                name,
                type,
                description,
                created_at: new Date().toISOString()
            };

            callback(null, newCategory);
        });
    },

    // Actualizar categoría
    update: (id, user_id, name, type, description, callback) => {
        db.run(`UPDATE categories SET name = ?, type = ?, description = ? WHERE id = ? AND user_id = ?`, [name, type, description, id, user_id], function (err) {
            callback(err, this?.changes);
        })
    },

    // Eliminar categoría
    delete: (id, user_id, callback) => {
        db.run(`
            DELETE FROM categories 
            WHERE id = ? AND user_id = ?
        `, [id, user_id], function (err) {
            callback(err, this?.changes);
        });
    }
};
