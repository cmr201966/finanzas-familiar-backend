const express = require('express');
const app = express();
const expensesRoutes = require('./routes/expenses');
const { initTables } = require('./db/database');

app.use(express.json());

app.use('/api/expenses', expensesRoutes);

initTables()

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
