import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { cwd } from 'process';

const DIR = join(cwd(), 'docs');
const DIR_COMPONENTS = join(DIR, 'components');
const DIR_PATHS = join(DIR, 'paths');

function readComponents(dir) {
  const components = {};
  const types = ['schemas', 'responses', 'parameters', 'securitySchemes'];

  try {
    types.forEach(type => {
      const files = readdirSync(join(dir, type));
      components[type] = files.reduce((acc, file) => {
        try {
          const content = JSON.parse(readFileSync(join(dir, type, file), 'utf8'));

          if (type === 'schemas') {
            return { ...acc, ...content };
          }

          return { ...acc, [basename(file, '.json')]: content };
        } catch (error) {
          console.error(`Error en archivo ${file}:`, error.message);
          return acc;
        }
      }, {});
    });
  } catch (error) {
    console.error('Error en componentes:', error.message);
  }

  return components;
}

function readPaths(dir) {
  try {
    const paths = {};
    if (!statSync(dir).isDirectory()) return paths;

    readdirSync(dir)
      .filter(file => extname(file) === '.json')
      .forEach(file => {
        const filePath = join(dir, file);
        try {
          Object.assign(paths, JSON.parse(readFileSync(filePath, 'utf8')));
        } catch (error) {
          console.error(`Error en ruta ${file}:`, error.message);
        }
      });

    return paths;
  } catch (error) {
    console.error('Error en rutas:', error.message);
    return {};
  }
}

const swaggerDoc = {
  openapi: '3.1.0',
  info: {
    title: 'Finanzas Familiar API',
    version: '1.0.0',
    description: `
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
    `
  },
  servers: [
    {
      url: 'http://localhost:3000/api/',
      description: 'Servidor local'
    }
  ],
  paths: readPaths(DIR_PATHS),
  components: readComponents(DIR_COMPONENTS)
};

export default swaggerDoc;
