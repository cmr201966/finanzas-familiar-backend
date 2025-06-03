import { db } from '../db/database.js';

import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

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
    getUserByUserName: (username, callback) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], function (err, row) {
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
        db.get(`SELECT * FROM users WHERE (username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE OR phone = ?)`, [user, user, user], function (err, row) {
            callback(err, row);
        });
    },
    getUserForRegister: ({ username, email, phone }, callback) => {
        db.get(`SELECT * FROM users WHERE (username = ? or email = ? or phone = ?)`, [username, email, phone], function (err, row) {
            callback(err, row);
        });
    },

        update: ({ username, updatedUser }, callback) => {
        let fields = ['name = ?', 'phone = ?', 'email = ?'];
        let values = [updatedUser.name, updatedUser.phone, updatedUser.email];
    
        // Si hay contraseña, encriptamos primero
        if (updatedUser.pw !== '' && updatedUser.pw !== null && updatedUser.pw !== undefined) {
            bcrypt.hash(updatedUser.pw, SALT_ROUNDS, (err, hashedPw) => {
                if (err) return callback(err);
    
                fields.push('pw = ?');
                values.push(hashedPw);
                values.push(username);
    
                const sql = `UPDATE users SET ${fields.join(', ')} WHERE username = ?`;
    
                db.run(sql, values, function (err) {
                    callback(err, this);
                });
            });
        } else {
            // Si no hay contraseña, solo actualizamos los otros campos
            values.push(username);
            const sql = `UPDATE users SET ${fields.join(', ')} WHERE username = ?`;
    
            db.run(sql, values, function (err) {
                callback(err, this);
            });
        }
    }
    

//    update: ({ username, updatedUser }, callback) => {
//        db.run(`UPDATE users SET name = ?, phone = ?, email = ? WHERE username = ?`, [updatedUser.name, updatedUser.phone, updatedUser.emael, username ], function (err) {
//            callback(err, row);
//        });
//    },
}



