import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

// Swagger Docs

// Paths JSON
const expenses = JSON.parse(readFileSync(join(cwd(), './docs/paths/expenses.json'), 'utf8'));
const users = JSON.parse(readFileSync(join(cwd(), './docs/paths/users.json'), 'utf8'));
const auth = JSON.parse(readFileSync(join(cwd(), './docs/paths/auth.json'), 'utf8'));
const accounts = JSON.parse(readFileSync(join(cwd(), './docs/paths/accounts.json'), 'utf8'));
const categorias = JSON.parse(readFileSync(join(cwd(), './docs/paths/categorias.json'), 'utf8'));
const presupuestos = JSON.parse(readFileSync(join(cwd(), './docs/paths/presupuestos.json'), 'utf8'));
const bancos = JSON.parse(readFileSync(join(cwd(), './docs/paths/bancos.json'), 'utf8'));
const tipocuentas = JSON.parse(readFileSync(join(cwd(), './docs/paths/tipocuentas.json'), 'utf8'));

// Schemas 
import { schemas } from './components/schemas.js';

const paths = {
  ...auth,
  ...users,
  ...expenses,
  ...accounts,
  ...categorias,
  ...presupuestos,
  ...bancos,
  ...tipocuentas,
};


export const swaggerDoc = {
  openapi: '3.1.0',
  info: {
    title: 'Finanzas Familiar API',
    version: '1.0.0',
    description: 'Documentación de la API para usuarios, gastos y autenticación',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/',
      description: 'Servidor local',
    },
  ],
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
  },
  paths
}

