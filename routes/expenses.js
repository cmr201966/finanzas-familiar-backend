import { Router } from 'express';

import { ExpenseModel } from '../models/expense.js';

export const ExpenseRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Gestión de gastos
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Crear un nuevo gasto
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - description
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Gasto creado exitosamente
 *       500:
 *         description: Error del servidor
 */

// Crear gasto
ExpenseRouter.post('/', (req, res) => {
  ExpenseModel.create(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id });
  });
});


/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Actualizar un gasto existente
 *     tags: [Expenses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del gasto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Gasto actualizado
 *       500:
 *         description: Error del servidor
 */

// Modificar gasto
ExpenseRouter.put('/:id', (req, res) => {
  ExpenseModel.update(req.params.id, req.body, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: changes });
  });
});


/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Eliminar un gasto
 *     tags: [Expenses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del gasto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gasto eliminado
 *       500:
 *         description: Error del servidor
 */

// Eliminar gasto
ExpenseRouter.delete('/:id', (req, res) => {
  ExpenseModel.delete(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: changes });
  });
});

