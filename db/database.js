import sqlite3 from 'sqlite3';
import { Config } from '../config.js';

export const db = new sqlite3.Database(Config.db.path, (err) => {
  if (err) return console.error(err.message);
  console.log('Conectado a la base de datos SQLite.');
});

export function initTables() {
  db.serialize(() => {
    // Tabla de usuarios
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

    // Tabla de cuentas
    db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('efectivo', 'banco', 'tarjeta')),
      bank TEXT NOT NULL CHECK (bank IN ('BPA', 'BANDEC', 'METROPOLITANO')),
      initial_balance DECIMAL(10, 2) DEFAULT 0.0,
      user_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

    // Tabla de categorías
    db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
      description TEXT,
      user_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

    // Tabla de transacciones
    db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount DECIMAL(10, 2) NOT NULL,
      type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      category_id INTEGER,
      account_id INTEGER,
      user_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (account_id) REFERENCES accounts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

    // Tabla de transferencias
    db.run(`
    CREATE TABLE IF NOT EXISTS transfers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_account_id INTEGER NOT NULL,
      to_account_id INTEGER NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      date DATE NOT NULL,
      description TEXT,
      user_id INTEGER,
      FOREIGN KEY (from_account_id) REFERENCES accounts(id),
      FOREIGN KEY (to_account_id) REFERENCES accounts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

    // Tabla de presupuestos
    db.run(`
    CREATE TABLE IF NOT EXISTS presupuestos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      categoria_id INTEGER,
      monto_limite REAL,
      mes TEXT,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(usuario_id, categoria_id, mes)
    );
  `);
  })

  console.log('Tablas creadas');
}

