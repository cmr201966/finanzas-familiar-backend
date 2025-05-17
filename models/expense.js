import { db } from '../db/database.js';

export const ExpenseModel = {
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

