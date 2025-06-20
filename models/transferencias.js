import { db } from "../db/database.js";

export const TransferenciasModel = {
    //create: (transferencia, callback) => {
    //    const [dia, mes, anio] = transferencia.date.split('/');       
    //    const fechaFormateada = `${anio}-${mes}-${dia}`;
    //    db.run('INSERT INTO transfers (from_account_id, to_account_id, amount, date, description, user_id) VALUES (?, ?, ?, ?, ?, ?)', 
    //        [transferencia.from_account_id, transferencia.to_account_id, transferencia.amount, fechaFormateada, transferencia.description, 
    //         transferencia.user_id], function (err) {
    //        const newTransferencia = { id: this.lastID, ...transferencia };
    //        callback(err, newTransferencia);
    //    });
    //},
    create: (transferencia, callback) => {
        const [dia, mes, anio] = transferencia.date.split('/');
        const fechaFormateada = `${anio}-${mes}-${dia}`;
    
        db.serialize(() => {
            // Iniciar la transacción
            db.run("BEGIN TRANSACTION");
    
            // Restar del from_account
            db.run(`UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?`, 
                [transferencia.amount, transferencia.from_account_id], function (err) {
                if (err) {
                    db.run("ROLLBACK");
                    return callback(err);
                }
    
                // Sumar al to_account
                db.run(`UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?`, 
                    [transferencia.amount, transferencia.to_account_id], function (err) {
                    if (err) {
                        db.run("ROLLBACK");
                        return callback(err);
                    }
    
                    // Insertar la transferencia
                    db.run(
                        `INSERT INTO transfers (from_account_id, to_account_id, amount, date, description, user_id) 
                         VALUES (?, ?, ?, ?, ?, ?)`,
                        [
                            transferencia.from_account_id,
                            transferencia.to_account_id,
                            transferencia.amount,
                            fechaFormateada,
                            transferencia.description,
                            transferencia.user_id
                        ],
                        function (err) {
                            if (err) {
                                db.run("ROLLBACK");
                                return callback(err);
                            }
    
                            // Confirmar la transacción
                            db.run("COMMIT", (err) => {
                                if (err) {
                                    return callback(err);
                                }
    
                                const newTransferencia = { id: this.lastID, ...transferencia };
                                callback(null, newTransferencia);
                            });
                        }
                    );
                });
            });
        });
    }
,    

    get: (callback) => {
        db.all('SELECT * FROM transfers', function (err, rows) {
            callback(err, rows);
        });
    },

    getTransferenciaById: (id, callback) => {
        db.all(`SELECT * FROM transfers WHERE user_id = ?`, [id], function (err, row) {
            callback(err, row);
        });
    },

    //update: (id, transferencia, callback) => {
    //    db.run(`UPDATE transfers SET from_account_id = ?, to_account_id = ?, amount = ?, date = ?, description = ?, user_id = ? WHERE id = ?`, 
    //        [transferencia.from_account_id, transferencia.to_account_id, transferencia.amount, transferencia.date, transferencia.description, 
    //         transferencia.user_id, id], function (err) {
    //        callback(err, this?.changes);
    //    });
    //},
    update: (id, transferencia, callback) => {
        const [dia, mes, anio] = transferencia.date.split('/');
        const fechaFormateada = `${anio}-${mes}-${dia}`;
    
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
    
            // 1. Obtener la transferencia original
            db.get(`SELECT * FROM transfers WHERE id = ?`, [id], (err, originalTransfer) => {
                if (err || !originalTransfer) {
                    db.run("ROLLBACK");
                    return callback(err || new Error("Transferencia no encontrada"));
                }
    
                // 2. Revertir impacto de la transferencia original
                db.run(`UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?`, 
                    [originalTransfer.amount, originalTransfer.from_account_id], function (err) {
                    if (err) {
                        db.run("ROLLBACK");
                        return callback(err);
                    }
    
                    db.run(`UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?`, 
                        [originalTransfer.amount, originalTransfer.to_account_id], function (err) {
                        if (err) {
                            db.run("ROLLBACK");
                            return callback(err);
                        }
    
                        // 3. Aplicar nuevo impacto
                        db.run(`UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?`, 
                            [transferencia.amount, transferencia.from_account_id], function (err) {
                            if (err) {
                                db.run("ROLLBACK");
                                return callback(err);
                            }
    
                            db.run(`UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?`, 
                                [transferencia.amount, transferencia.to_account_id], function (err) {
                                if (err) {
                                    db.run("ROLLBACK");
                                    return callback(err);
                                }
    
                                // 4. Actualizar transferencia
                                db.run(`UPDATE transfers 
                                        SET from_account_id = ?, to_account_id = ?, amount = ?, date = ?, description = ?, user_id = ? 
                                        WHERE id = ?`, 
                                    [
                                        transferencia.from_account_id,
                                        transferencia.to_account_id,
                                        transferencia.amount,
                                        fechaFormateada,
                                        transferencia.description,
                                        transferencia.user_id,
                                        id
                                    ],
                                    function (err) {
                                        if (err) {
                                            db.run("ROLLBACK");
                                            return callback(err);
                                        }
    
                                        // 5. Confirmar transacción
                                        db.run("COMMIT", (err) => {
                                            if (err) return callback(err);
                                            callback(null, this?.changes);
                                        });
                                    }
                                );
                            });
                        });
                    });
                });
            });
        });
    }
,    
 
    delete: (id, callback) => {
        db.get(`SELECT * FROM transfers WHERE id = ?`, [id], function (err, transfer) {
            if (err) return callback(err);
            if (!transfer) return callback(new Error('Transfer not found'));
    
            const { from_account_id, to_account_id, amount } = transfer;
    
            db.serialize(() => {
                // Iniciar transacción
                db.run("BEGIN TRANSACTION");
    
                // Revertir balances
                db.run(`UPDATE accounts SET initial_balance = initial_balance + ? WHERE id = ?`,
                    [amount, from_account_id], function (err) {
                        if (err) {
                            db.run("ROLLBACK");
                            return callback(err);
                        }
    
                        db.run(`UPDATE accounts SET initial_balance = initial_balance - ? WHERE id = ?`,
                            [amount, to_account_id], function (err) {
                                if (err) {
                                    db.run("ROLLBACK");
                                    return callback(err);
                                }
    
                                // Eliminar la transferencia
                                db.run(`DELETE FROM transfers WHERE id = ?`, [id], function (err) {
                                    if (err) {
                                        db.run("ROLLBACK");
                                        return callback(err);
                                    }
    
                                    // Confirmar la transacción
                                    db.run("COMMIT", (err) => {
                                        if (err) {
                                            return callback(err);
                                        }
                                        callback(null, this?.changes);
                                    });
                                });
                            });
                    });
            });
        });
    }
,    
 //   delete: (id, callback) => {
 //       db.run(`DELETE FROM transfers WHERE id = ?`, [id], function (err) {
 //           callback(err, this?.changes);
 //       });
 //   },
}