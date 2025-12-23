import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import authSwagger from "./docs/auth.swagger.js";
import usersSwagger from "./docs/users.swagger.js";
import categoriesSwagger from "./docs/categories.swagger.js";
import instructorsSwagger from "./docs/instructors.swagger.js";
import adminsSwagger from "./docs/admins.swagger.js";
import notificationsSwagger from "./docs/notifications.swagger.js";
import coursesSwagger from "./docs/courses.swagger.js";
import lessonsSwagger from "./docs/lessons.swagger.js";
import purchasesSwagger from "./docs/purchases.swagger.js";
import paymentsSwagger from "./docs/payments.swagger.js";
import statsSwagger from "./docs/stats.swagger.js"

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Online Education Platform API",
    version: "1.0.0",
    description: "Full backend API documentation"
  },
  servers: [
    { url: "http://localhost:4000", description: "Local server" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    ...authSwagger.paths,
    ...usersSwagger.paths,
    ...categoriesSwagger.paths,
    ...instructorsSwagger.paths,
    ...adminsSwagger.paths,
    ...notificationsSwagger.paths,
    ...coursesSwagger.paths,
    ...lessonsSwagger.paths,
    ...purchasesSwagger.paths,
    ...paymentsSwagger.paths,
    ...statsSwagger.paths
  },
  components: {
    schemas: {
      ...authSwagger.components.schemas,
      ...usersSwagger.components.schemas,
      ...categoriesSwagger.components.schemas,
      ...instructorsSwagger.components.schemas,
      ...adminsSwagger.components.schemas,
      ...notificationsSwagger.components.schemas,
      ...coursesSwagger.components.schemas,
      ...lessonsSwagger.components.schemas,
      ...purchasesSwagger.components.schemas,
      ...paymentsSwagger.components.schemas,
      ...statsSwagger.components.schemas
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:4000/api-docs");
};
