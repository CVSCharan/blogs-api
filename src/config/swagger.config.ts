import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env.config";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blogs API",
      version: "1.0.0",
      description: "API documentation for the Blogs microservice",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/presentation/routes/*.ts", "./src/application/dtos/*.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
