const express = require('express');
const service = require('./service-config');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jobby API',
      version: '1.0.0',
      description:
        'Dummy API that will let me experiment with frontend frameworks',
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

service(app);

app.listen(port, () => {
  // eslint-disable-next-line no-undef
  console.log(`app listening at http://localhost:${port}/api-docs`);
});
