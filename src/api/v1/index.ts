import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { globalErrorHandler } from "./common/errors/error-handler";
import { authModule } from "./modules/auth/http/auth.routes";
import { churchModule } from "./modules/churches/http/church.routes";

const api = new OpenAPIHono().basePath("/api/v1");

api.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

api.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Publication Scheduler API",
    description: "API do sistema Publication Scheduler",
  },
});

api.get("/swagger", swaggerUI({ url: "/api/v1/doc" }));

api.onError(globalErrorHandler);

api.route("/", authModule);
api.route("/", churchModule);

export { api };
