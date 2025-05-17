const express = require('express');
const app = express();

const config = require('./config');

// Routes
const expensesRoutes = require('./routes/expenses');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')

const { initTables } = require('./db/database');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/users', usersRoutes);

initTables()

app.listen(config.db.port, () => {
  console.log(`Servidor corriendo en http://localhost:${config.db.port}`);
});
