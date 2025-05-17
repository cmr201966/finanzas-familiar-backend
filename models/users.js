import { db } from '../db/database.js';

export const UsersModel = {
    createUser: (user, callback) => {
        db.run('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?,?)', [user.name, user.email, user.password, user.phone], function (err) {
            const newUser = { id: this.lastID, ...user };
            callback(err, newUser);
        });

    },
    getUsers: (callback) => {
        db.all('SELECT * FROM users', function (err, rows) {
            callback(err, rows);
        });
    },
    getUserById: (id, callback) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },
    getUserByEmail: (email, callback) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], function (err, row) {
            callback(err, row);
        });
    },
    getUserByPhone: (phone, callback) => {
        db.get(`SELECT * FROM users WHERE phone = ?`, [phone], function (err, row) {
            callback(err, row);
        });
    },
}


