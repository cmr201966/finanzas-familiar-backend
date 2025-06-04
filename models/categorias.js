import { db } from '../db/database.js';

export const CategoriasModel = {

  getCategorias: (callback) => {
    db.all(
      `SELECT * FROM categories`,
      function (err, rows) {
        callback(err, rows);
      }
    );
  },
  getCategoriasByType: (type, iduser, callback) => {
    db.all(
      `SELECT categories.* FROM categories, users WHERE (type = ?) and (users.id=categories.user_id) and (users.username=?)`,
      [type, iduser],
      function (err, rows) {
        callback(err, rows);
      }
    );
  },
  
  create: (categoria, callback) => {
    const { name, type, description, user_id, created_at } = categoria;
    db.run(
      `INSERT INTO categories (name, type, description, user_id, created_at) VALUES (?, ?, ?, ?, ?)`, [name, type, description, user_id, created_at],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  update: (id, categoria, callback) => {
    const { amount, description, date } = categoria;
    db.run(
      `UPDATE transactions SET amount = ?, description = ?, date = ? WHERE id = ? AND type = 'expense'`,
      [amount, description, date, id],
      function (err) {
        callback(err, this?.changes);
      }
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM transactions WHERE id = ? AND type = 'expense'`, [id], function (err) {
      callback(err, this?.changes);
    });
  },
};

