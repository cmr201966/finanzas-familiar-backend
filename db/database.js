const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'finanzas.db'), (err) => {
  if (err) return console.error(err.message);
  console.log('Conectado a la base de datos SQLite.');
});

module.exports = db;
