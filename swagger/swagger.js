const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const UserSwagger = require("./UserSwagger");
const ThreadSwagger = require("./ThreadSwagger");

const doc = {
  info: {
    title: "Circle App",
    description: "API Docs",
  },
  host: "localhost:3000",
  components: {
    "@schemas": {
      ...UserSwagger,
      ...ThreadSwagger,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["../src/server.ts"];

swaggerAutogen(outputFile, routes, doc);
