const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Crear gasto
router.post('/', (req, res) => {
  Expense.create(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id });
  });
});

// Modificar gasto
router.put('/:id', (req, res) => {
  Expense.update(req.params.id, req.body, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: changes });
  });
});

// Eliminar gasto
router.delete('/:id', (req, res) => {
  Expense.delete(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: changes });
  });
});

module.exports = router;
