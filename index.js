import express, { json } from 'express';
import cors from 'cors';

// Swagger
import swaggerUi from 'swagger-ui-express'
import { swaggerDoc } from './docs/swagger.js'

// Routes
import { CategoriasRouter } from './routes/categorias.js';
import { UsersRouter } from './routes/users.js';
import { AuthRouter } from './routes/auth.js';
import { AccountsRouter } from './routes/accounts.js';
import { PresupuestosRouter } from './routes/presupuestos.js';
import { BancosRouter } from './routes/bancos.js';
import { TipoCuentasRouter } from './routes/tipocuentas.js';
import { NotFoundRouter } from './routes/404.js';

import { initTables } from './db/database.js';
// import { seedDatabase } from './db/seed.js';

import { Config } from './config.js';

const app = express();

app.use(json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use('/api/auth', AuthRouter);
app.use('/api/categorias', CategoriasRouter);
app.use('/api/users', UsersRouter);
app.use('/api/accounts', AccountsRouter);
app.use('/api/presupuestos', PresupuestosRouter);
app.use('/api/bancos', BancosRouter);
app.use('/api/tipocuentas', TipoCuentasRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(NotFoundRouter)

initTables()
// seedDatabase()

app.listen(Config.server.port, () => {
  console.log(`Servidor corriendo en http://localhost:${Config.server.port}`);
});
