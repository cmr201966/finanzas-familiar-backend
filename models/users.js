import { db } from '../db/database.js';

export const UsersModel = {
    create: (user, callback) => {
        db.run('INSERT INTO users (username, name, email, password, phone) VALUES (?, ?, ?, ?, ?)', [user.username, user.name, user.email, user.password, user.phone], function (err) {
            const newUser = { id: this.lastID, ...user };
            callback(err, newUser);
        });
    },
    get: (callback) => {
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
    getUserByUsername: (username, callback) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], function (err, row) {
            callback(err, row);
        });
    },
    getUserForLogin: (user, callback) => {
        db.get(`SELECT * FROM users WHERE (username = ? or email = ? or phone = ?)`, [user, user, user], function (err, row) {
            callback(err, row);
        });
    },
    getUserForRegister: ({ username, email, phone }, callback) => {
        db.get(`SELECT * FROM users WHERE (username = ? or email = ? or phone = ?)`, [username, email, phone], function (err, row) {
            callback(err, row);
        });
    }
}



