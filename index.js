import express, { json } from 'express';
import cors from 'cors';

import { Config } from './config.js';

// Routes
import { ExpenseRouter } from './routes/expenses.js';
import { UsersRouter } from './routes/users.js';
import { AuthRouter } from './routes/auth.js';

import { initTables } from './db/database.js';
// import { seedDatabase } from './db/seed.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swaggerOptions.js';

const app = express();

app.use(json());
app.use(cors({
  origin: "*",
}));

app.use('/api/auth', AuthRouter);
app.use('/api/expenses', ExpenseRouter);
app.use('/api/users', UsersRouter);

initTables()
// seedDatabase()

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(Config.server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${Config.server.port}`);
});
