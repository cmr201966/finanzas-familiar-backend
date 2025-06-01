import { db } from '../db/database.js';

export const ExpenseModel = {
  getCategorias: (callback) => {
    db.all(
      `SELECT * FROM categories`,
      function (err, rows) {
        callback(err, rows);
      }
    );
  },
  getCategoriasByType: (type, iduser, callback) => {
    console.log("Ruta")
    db.all(
      `SELECT categories.* FROM categories, users WHERE (type = ?) and (users.id=categories.user_id) and (users.username=?)`,
      [type, iduser],
      function (err, rows) {
        callback(err, rows);
      }
    );
  },
  
  create: (expense, callback) => {
    const { amount, description, date } = expense;
    db.run(
      `INSERT INTO transactions (amount, type, description, date) VALUES (?, 'expense', ?, ?)`,
      [amount, description, date],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  update: (id, expense, callback) => {
    const { amount, description, date } = expense;
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

