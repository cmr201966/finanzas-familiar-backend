import { db } from "../db/database.js";

export const TransaccionesModel = {
    //create: (transaccion, callback) => {
    //    db.run('INSERT INTO transactions (amount, type, description, date, category_id, account_id, user_id, created_at) VALUES (?, ?, ?, ? ,?, ?, ?, ?)', 
    //        [transaccion.amount, transaccion.type, transaccion.description, transaccion.date, transaccion.category_id, transaccion.account_id, 
    //            transaccion.user_id, transaccion.created_at], function (err) {
    //        const newTransaccion = { id: this.lastID, ...transaccion };
    //        callback(err, newTransaccion);
    //    });
    //},
    create: (transaccion, callback) => {
        db.get('SELECT type FROM categories WHERE id = ?', [transaccion.category_id], (err, row) => {
            if (err) return callback(err);
    
            if (!row) return callback(new Error('Categoría no encontrada'));
    
//            const categoryType = row.type;
            const amount = parseFloat(transaccion.amount);
    
            // Actualizar balance de la cuenta según tipo
//            const balanceQuery = categoryType === 'ingreso'
//                ? 'UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?'
//                : 'UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?';
    
//            db.run(balanceQuery, [amount, transaccion.account_id], function (err) {
//                if (err) return callback(err);
    
                // Insertar la transacción después de actualizar el balance
                db.run(
                    'INSERT INTO transactions (amount, type, description, date, category_id, account_id, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        amount,
                        transaccion.type,
                        transaccion.description,
                        transaccion.date,
                        transaccion.category_id,
                        transaccion.account_id,
                        transaccion.user_id,
                        transaccion.created_at
                    ],
                    function (err) {
                        const newTransaccion = { id: this.lastID, ...transaccion };
                        callback(err, newTransaccion);
                    }
                );
//            });
        });
    },
    


    get: (callback) => {
        db.all('SELECT * FROM transactions', function (err, rows) {
            callback(err, rows);
        });
    },

    getTransaccionById: (id, callback) => {
        db.get(`SELECT * FROM transactions WHERE id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },

    update: (id, transaccion, callback) => {
        db.run(`UPDATE transactions SET amount = ?, type = ?, description = ?, date = ?, category_id = ?, account_id = ?, user_id = ?, created_at = ? WHERE id = ?`, 
            [transaccion.amount, transaccion.type, transaccion.description, transaccion.date, transaccion.category_id, transaccion.account_id, transaccion.user_id, 
             transaccion.created_at, id], function (err) {
            callback(err, this?.changes);
        });
    },
/*
    update: (id, transaccion, callback) => {
        // Paso 1: Obtener la transacción original
        db.get(`SELECT amount, account_id, category_id FROM transactions WHERE id = ?`, [id], (err, oldTrans) => {
            if (err) return callback(err);
            if (!oldTrans) return callback(new Error('Transacción no encontrada'));
    
            const oldAmount = parseFloat(oldTrans.amount);
            const oldAccountId = oldTrans.account_id;
            const oldCategoryId = oldTrans.category_id;
    
            // Paso 2: Obtener tipo de la categoría anterior
            db.get(`SELECT type FROM categories WHERE id = ?`, [oldCategoryId], (err, oldCat) => {
                if (err) return callback(err);
                if (!oldCat) return callback(new Error('Categoría anterior no encontrada'));
    
                const oldType = oldCat.type;
    
                // Paso 3: Revertir efecto anterior
                const revertQuery = oldType === 'income'
                    ? 'UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?'
                    : 'UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?';
    
                db.run(revertQuery, [oldAmount, oldAccountId], function (err) {
                    if (err) return callback(err);
    
                    // Paso 4: Obtener tipo de la nueva categoría
                    db.get(`SELECT type FROM categories WHERE id = ?`, [transaccion.category_id], (err, newCat) => {
                        if (err) return callback(err);
                        if (!newCat) return callback(new Error('Nueva categoría no encontrada'));
    
                        const newType = newCat.type;
                        const newAmount = parseFloat(transaccion.amount);
                        const newAccountId = transaccion.account_id;
    
                        // Paso 5: Aplicar efecto nuevo
                        const applyQuery = newType === 'ingreso'
                            ? 'UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?'
                            : 'UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?';
    
                        db.run(applyQuery, [newAmount, newAccountId], function (err) {
                            if (err) return callback(err);
    
                            // Paso 6: Actualizar transacción
                            db.run(`UPDATE transactions SET amount = ?, type = ?, description = ?, date = ?, category_id = ?, account_id = ?, user_id = ?, created_at = ? WHERE id = ?`,
                                [
                                    transaccion.amount,
                                    transaccion.type,
                                    transaccion.description,
                                    transaccion.date,
                                    transaccion.category_id,
                                    transaccion.account_id,
                                    transaccion.user_id,
                                    transaccion.created_at,
                                    id
                                ],
                                function (err) {
                                    callback(err, this?.changes);
                                }
                            );
                        });
                    });
                });
            });
        });
    },
  */  

    delete: (id, callback) => {
        db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
/*
    delete: (id, callback) => {
        // Paso 1: Obtener la transacción
        db.get(`SELECT amount, account_id, category_id FROM transactions WHERE id = ?`, [id], (err, transaccion) => {
            if (err) return callback(err);
            if (!transaccion) return callback(new Error('Transacción no encontrada'));
    
            const { amount, account_id, category_id } = transaccion;
    
            // Paso 2: Obtener el tipo de la categoría
            db.get(`SELECT type FROM categories WHERE id = ?`, [category_id], (err, category) => {
                if (err) return callback(err);
                if (!category) return callback(new Error('Categoría no encontrada'));
    
                const tipo = category.type;
                const monto = parseFloat(amount);
    
                // Paso 3: Ajustar el balance
                const balanceQuery = tipo === 'ingreso'
                    ? 'UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?'
                    : 'UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?';
    
                db.run(balanceQuery, [monto, account_id], function (err) {
                    if (err) return callback(err);
    
                    // Paso 4: Eliminar la transacción
                    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
                        callback(err, this?.changes);
                    });
                });
            });
        });
    },
    */
    
}