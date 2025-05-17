import { db } from './database.js';
import { hashSync } from 'bcrypt';

export function seedDatabase() {
    db.serialize(() => {
        // Usuarios
        const users = [
            ['Juan Pérez', 'juan@example.com', '1234secure', '+341234567891'],
//            ['cmr', 'cmr@example.com', '1235', '52675359'],
            ['María García', 'maria@example.com', 'abcd1234', '+341112223332'],
            ['Carlos López', 'carlos@example.com', 'passw0rd', '+341998877663'],
            ['Lucía Torres', 'lucia@example.com', 'securepass', '+346667778884'],
            ['Ana Martínez', 'ana@example.com', 'ana123456', '+346661112225'],
        ];

        const hashedUsers = users.map((user) => {
            return [user[0], user[1], hashSync(user[2], 10), user[3]];
        });

        hashedUsers.forEach((user, index) => {
            db.run(`INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`, user, function (err) {
                if (err) return console.error(`❌ Error insertando usuario ${user[0]}:`, err.message);
                const userId = this.lastID;

                // Cuentas
                db.run(`INSERT INTO accounts (name, type, initial_balance, user_id) VALUES (?, ?, ?, ?)`, [`Cuenta Efectivo ${index + 1}`, 'efectivo', 500 + index * 100, userId]);
                db.run(`INSERT INTO accounts (name, type, initial_balance, user_id) VALUES (?, ?, ?, ?)`, [`Cuenta Banco ${index + 1}`, 'banco', 1000 + index * 150, userId]);

                // Categorías
                db.run(`INSERT INTO categories (name, type, user_id) VALUES (?, ?, ?)`, ['Sueldo', 'income', userId]);
                db.run(`INSERT INTO categories (name, type, user_id) VALUES (?, ?, ?)`, ['Comida', 'expense', userId]);
                db.run(`INSERT INTO categories (name, type, user_id) VALUES (?, ?, ?)`, ['Transporte', 'expense', userId]);

                // Transacciones
                db.run(`INSERT INTO transactions (amount, type, description, date, category_id, account_id, user_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [1500 + index * 100, 'income', 'Salario mensual', '2025-05-01', 1, 1, userId]);

                db.run(`INSERT INTO transactions (amount, type, description, date, category_id, account_id, user_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [200 + index * 10, 'expense', 'Supermercado', '2025-05-02', 2, 1, userId]);

                db.run(`INSERT INTO transactions (amount, type, description, date, category_id, account_id, user_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [100 + index * 5, 'expense', 'Autobús', '2025-05-03', 3, 1, userId]);

                // Transferencias
                db.run(`INSERT INTO transfers (from_account_id, to_account_id, amount, date, description, user_id)
                VALUES (?, ?, ?, ?, ?, ?)`, [2, 1, 100 + index * 10, '2025-05-04', 'Transferencia mensual', userId]);

                // Presupuestos
                db.run(`INSERT INTO presupuestos (usuario_id, categoria_id, monto_limite, mes) 
                VALUES (?, ?, ?, ?)`, [userId, 2, 400 + index * 50, '2025-05']);
            });
        });
    });

    console.log("Todos los datos se han insertado correctamente");
}

seedDatabase();
