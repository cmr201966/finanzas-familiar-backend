const express = require('express');
const app = express();

// Routes
const expensesRoutes = require('./routes/expenses');
const usersRoutes = require('./routes/users');

const { initTables } = require('./db/database');

app.use(express.json());

app.use('/api/expenses', expensesRoutes);
app.use('/api/users', usersRoutes);

initTables()

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
