import express, { json } from 'express';
import cors from 'cors';

// Swagger
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './docs/swagger.js'

// Routes
import { ExpenseRouter } from './routes/expenses.js';
import { UsersRouter } from './routes/users.js';
import { AuthRouter } from './routes/auth.js';
import { AccountsRouter } from './routes/accounts.js';
import { BudgetsRouter } from './routes/budgets.js';
import { NotFoundRouter } from './routes/notFound.js';

// Middlewares
import authMiddleware from './middleware/auth.js';

// Database
import { initTables } from './db/database.js';
// import { seedDatabase } from './db/seed.js';

import { Config } from './config.js';

const app = express();
app.disable('x-powered-by');

app.use(json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use('/api/auth', AuthRouter);
app.use('/api/expenses', authMiddleware, ExpenseRouter);
app.use('/api/users', authMiddleware, UsersRouter);
app.use('/api/accounts', authMiddleware, AccountsRouter);
app.use('/api/budgets', authMiddleware, BudgetsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(NotFoundRouter)

initTables()
// seedDatabase()

app.listen(Config.server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${Config.server.port}`);
});
