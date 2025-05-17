import { Router } from 'express';

import { ExpenseModel } from '../models/expense.js';

export const ExpenseRouter = Router();

// Crear gasto
ExpenseRouter.post('/', (req, res) => {
  ExpenseModel.create(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id });
  });
});

// Modificar gasto
ExpenseRouter.put('/:id', (req, res) => {
  ExpenseModel.update(req.params.id, req.body, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: changes });
  });
});

// Eliminar gasto
ExpenseRouter.delete('/:id', (req, res) => {
  ExpenseModel.delete(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: changes });
  });
});

