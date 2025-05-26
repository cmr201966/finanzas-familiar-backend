import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

// Swagger Docs

// Paths JSON
const expenses = JSON.parse(readFileSync(join(cwd(), './docs/paths/expenses.json'), 'utf8'));
const users = JSON.parse(readFileSync(join(cwd(), './docs/paths/users.json'), 'utf8'));
const auth = JSON.parse(readFileSync(join(cwd(), './docs/paths/auth.json'), 'utf8'));
const accounts = JSON.parse(readFileSync(join(cwd(), './docs/paths/accounts.json'), 'utf8'));

// Schemas 
import { schemas } from './components/schemas.js';

const paths = {
  ...auth,
  ...users,
  ...expenses,
  ...accounts,
};


const description = `
<h2 style="text-align:center;">🎉 Bienvenido/a a la documentación oficial de la API para la Gestión de Finanzas Familiares 🎉</h2>

<p>Aquí encontrarás todo lo que necesitas para interactuar de forma eficiente y segura con nuestro sistema. Esta API ha sido diseñada pensando en la organización, el control y la transparencia de tus finanzas personales y familiares.</p>

<h3>🔍 ¿Qué puedes consultar y gestionar con esta API?</h3>

<ul>
  <li><strong>🔐 Autenticación:</strong> Inicia sesión de forma segura y gestiona tus credenciales.</li>
  <li><strong>👤 Usuarios:</strong> Administra perfiles, roles y la información relevante de cada miembro.</li>
  <li><strong>💸 Gastos:</strong> Registra, actualiza y analiza los gastos del hogar en tiempo real.</li>
  <li><strong>🏦 Cuentas:</strong> Organiza tus cuentas bancarias o categorías de ahorro como mejor te convenga.</li>
</ul>

<p>Cada endpoint viene cuidadosamente documentado para que desarrolladores de todos los niveles puedan integrarse sin complicaciones.</p>

<i><b>✨ ¡Haz que tus finanzas trabajen para ti, no al revés! ✨</b></i> 
`;

export const swaggerDoc = {
  openapi: '3.1.0',
  info: {
    title: 'Finanzas Familiar API',
    version: '1.0.0',
    description
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

