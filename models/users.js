const { db } = require('../db/database');

const Users = {
    getUsers: (callback) => {
        db.all('SELECT * FROM users', function (err, rows) {
            callback(err, rows);
        });
    },
    getUserById: (id, callback) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    }
}


module.exports = Users;