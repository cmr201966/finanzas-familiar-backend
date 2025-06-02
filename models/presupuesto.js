import { db } from "../db/database.js";


export const PresupuestoModel = {

    create: (presupuesto, callback) => {
        db.run('INSERT INTO presupuestos (usuario_id, categoria_id, monto_limite, mes, creado_en) VALUES (?, ?, ?, ?, ?)', [presupuesto.usuario_id, presupuesto.categoria_id, presupuesto.monto_limite, presupuesto.mes, presupuesto.creado_en], 
            function (err) {
                const newPresupuesto = { id: this.lastID, ...presupuesto };
                callback(err, newPresupuesto);
            });
    },

    getPresupuestos: (callback) => {
        db.all('SELECT * FROM presupuestos', function (err, rows) {
            callback(err, rows);
        });
    },

    getPresupuestoById: (id, callback) => {
        db.get(`SELECT * FROM presupuestos WHERE (id = ?)`, [id], function (err, row) {
            callback(err, row);
        });
    },
    getPresupuestosByUserName: (username, callback) => {
        console.log(username)
        const query = `
SELECT 
  presupuestos.id, 
  presupuestos.monto_limite AS importe, 
  CASE presupuestos.mes
    WHEN 1 THEN 'enero'
    WHEN 2 THEN 'febrero'
    WHEN 3 THEN 'marzo'
    WHEN 4 THEN 'abril'
    WHEN 5 THEN 'mayo'
    WHEN 6 THEN 'junio'
    WHEN 7 THEN 'julio'
    WHEN 8 THEN 'agosto'
    WHEN 9 THEN 'septiembre'
    WHEN 10 THEN 'octubre'
    WHEN 11 THEN 'noviembre'
    WHEN 12 THEN 'diciembre'
    ELSE 'mes inválido'
  END AS mes,
  categories.description AS categoria
FROM presupuestos 
JOIN users ON presupuestos.usuario_id = users.id 
JOIN categories ON presupuestos.categoria_id = categories.id
WHERE users.username = ?
`;     
      
      db.all(query, [username], function (err, rows) {
        callback(err, rows);
      });        //db.all(`SELECT presupuestos.* FROM presupuestos JOIN users ON presupuestos.usuario_id = users.id WHERE users.username = ?`, [username], function (err, rows) {
        //    callback(err, rows);
        //});
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