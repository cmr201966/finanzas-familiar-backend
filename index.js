import express, { json } from 'express';

import { Config } from './config.js';

// Routes
import { ExpenseRouter } from './routes/expenses.js';
import { UsersRouter } from './routes/users.js';
import { AuthRouter } from './routes/auth.js';

import { initTables } from './db/database.js';

const app = express();

app.use(json());

app.use('/api/auth', AuthRouter);
app.use('/api/expenses', ExpenseRouter);
app.use('/api/users', UsersRouter);

initTables()

app.listen(Config.server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${Config.server.port}`);
});
