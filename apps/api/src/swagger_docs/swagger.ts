export const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PWS Web App API Documentation',
      version: '1.0.0',
    },
  },
  apis: ["./src/routes/*.js", "./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);