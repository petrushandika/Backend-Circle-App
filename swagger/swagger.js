const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const RegisterSwagger = require("./RegisterSwagger");
const LoginSwagger = require("./LoginSwagger");
const UserSwagger = require("./UserSwagger");
const ThreadSwagger = require("./ThreadSwagger");
const LikeSwagger = require("./LikeSwagger");
const ReplySwagger = require("./ReplySwagger");
const FollowSwagger = require("./FollowSwagger");

require("dotenv").config();

const doc = {
  info: {
    title: "Circle App",
    description: "API Docs",
  },
  servers: [
    {
      url: process.env.RAILWAY_API,
      description: "Production server",
    },
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    schemas: {
      ...RegisterSwagger,
      ...LoginSwagger,
      ...UserSwagger,
      ...ThreadSwagger,
      ...LikeSwagger,
      ...ReplySwagger,
      ...FollowSwagger,
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
