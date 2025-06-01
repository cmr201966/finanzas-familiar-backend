import { db } from '../db/database.js';

export const CategoriesModel = {
    // Obtener todas las categorías de un usuario
    getByUserId: (usuario_id, callback) => {
        db.all(`
            SELECT * 
            FROM categories 
            WHERE usuario_id = ? 
            ORDER BY type, name
        `, [usuario_id], function (err, rows) {
            callback(err, rows);
        });
    },

    // Obtener una categoría específica
    getById: (id, usuario_id, callback) => {
        db.get(`
            SELECT * 
            FROM categories 
            WHERE id = ? AND usuario_id = ?
        `, [id, usuario_id], function (err, row) {
            callback(err, row);
        });
    },

    // Crear nueva categoría
    create: (usuario_id, name, type, description, callback) => {
        db.run(`
            INSERT INTO categories (usuario_id, name, type, description) 
            VALUES (?, ?, ?, ?)
        `, [usuario_id, name, type, description], function (err) {
            if (err) return callback(err);
            
            const nuevaCategoria = {
                id: this.lastID,
                usuario_id,
                name,
                type,
                description,
                created_at: new Date().toISOString()
            };
            
            callback(null, nuevaCategoria);
        });
    },

    // Actualizar categoría
    update: (id, usuario_id, name, type, description, callback) => {
        db.get(`SELECT * FROM categories WHERE id = ? AND usuario_id = ?`, [id, usuario_id], function (err, row) {
            if (err) return callback(err);
            if (!row) return callback(null, null);

            const updateFields = [];
            const values = [];

            if (name !== undefined) {
                updateFields.push('name = ?');
                values.push(name);
            }
            if (type !== undefined) {
                updateFields.push('type = ?');
                values.push(type);
            }
            if (description !== undefined) {
                updateFields.push('description = ?');
                values.push(description);
            }

            if (updateFields.length === 0) {
                return callback(null, row);
            }

            const query = `UPDATE categories SET ${updateFields.join(', ')} WHERE id = ? AND usuario_id = ?`;
            values.push(id, usuario_id);

            db.run(query, values, function (err) {
                if (err) return callback(err);
                
                const updatedCategoria = {
                    ...row,
                    ...(name !== undefined && { name }),
                    ...(type !== undefined && { type }),
                    ...(description !== undefined && { description }),
                    updated_at: new Date().toISOString()
                };
                
                callback(null, updatedCategoria);
            });
        });
    },

    // Eliminar categoría
    delete: (id, usuario_id, callback) => {
        db.run(`
            DELETE FROM categories 
            WHERE id = ? AND usuario_id = ?
        `, [id, usuario_id], function (err) {
            callback(err);
        });
    }
};
