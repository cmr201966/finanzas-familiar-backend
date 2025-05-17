export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finanzas Familiar API',
      version: '1.0.0',
      description: 'Documentación de la API para usuarios, gastos y autenticación',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Aquí Swagger escanea las rutas para generar la documentación
};
