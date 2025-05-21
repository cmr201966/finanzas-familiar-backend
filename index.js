import express, { json } from 'express';
import cors from 'cors';

// Swagger
import swaggerUi from 'swagger-ui-express'
import { swaggerDoc } from './docs/swagger.js'

// Routes
import { ExpenseRouter } from './routes/expenses.js';
import { UsersRouter } from './routes/users.js';
import { AuthRouter } from './routes/auth.js';
import { NotFoundRouter } from './routes/404.js';

import { initTables } from './db/database.js';
// import { seedDatabase } from './db/seed.js';

import { Config } from './config.js';

const app = express();

app.use(json());
app.use(cors({
  origin: "*",
}));

app.use('/api/auth', AuthRouter);
app.use('/api/expenses', ExpenseRouter);
app.use('/api/users', UsersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(NotFoundRouter)

initTables()
// seedDatabase()

app.listen(Config.server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${Config.server.port}`);
});
