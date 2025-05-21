import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

// Swagger Docs

// Paths JSON
const expenses = JSON.parse(readFileSync(join(cwd(), './docs/paths/expenses.json'), 'utf8'));
const users = JSON.parse(readFileSync(join(cwd(), './docs/paths/users.json'), 'utf8'));
const auth = JSON.parse(readFileSync(join(cwd(), './docs/paths/auth.json'), 'utf8'));

// Schemas JSON
const schemas = JSON.parse(readFileSync(join(cwd(), './docs/components/schemas.json'), 'utf8'));

const paths = {
  ...auth,
  ...users,
  ...expenses,
};

export const swaggerDoc = {
  openapi: '3.0.4',
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
    schemas: schemas
  },
  paths
}

