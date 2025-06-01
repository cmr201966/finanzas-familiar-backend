import { db } from "../db/database.js";


export const PresupuestoModel = {
    create: (presupuesto, callback) => {
        console.log(presupuesto)
        db.run('INSERT INTO presupuestos (usuario_id, categoria_id, monto_limita, mes, creado_en) VALUES (?, ?, ?, ?, ?)', [presupuesto.usuario_id, presupuesto.categoria_id, presupuesto.monto_limite, presupuesto.mes, presupuesto.creado_en], function (err) {
            const newPresupuesto = { id: this.lastID, ...presupuesto };
            callback(err, newPresupuesto);
        });
    },

    getPresupuestos: (callback) => {
        db.all('SELECT * FROM presupuestos', function (err, rows) {
            callback(err, rows);
        });
    },

    getPresupuestosById: (id, callback) => {
        db.get(`SELECT * FROM presupuestos WHERE (id = ?)`, [id], function (err, row) {
            callback(err, row);
        });
    },
    getPresupuestosByUserName: (username, callback) => {
        db.all(`SELECT presupuestos.* FROM presupuestos JOIN users ON presupuestos.usuario_id = users.id WHERE users.username = ?`, [username], function (err, rows) {
            callback(err, rows);
        });
    },
    update: (id, presupuesto, callback) => {
        db.run(`UPDATE presupuestos SET usuario_id = ?, categoria_id = ?, monto_limite = ?, mes = ?, creado_en WHERE id = ?`, [presupuesto.usuario_id, presupuesto.categoria_id, presupuesto.monto_limite, presupuesto.mes, presupuesto.creado_en, id], function (err) {
            callback(err, this?.changes);
        });
    },
    delete: (id, callback) => {
        db.run(`DELETE FROM presupuestos WHERE id = ?`, [id], function (err) {
            callback(err, this?.changes);
        });
    },
}