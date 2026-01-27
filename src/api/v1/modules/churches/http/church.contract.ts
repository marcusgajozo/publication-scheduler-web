import { createRoute } from "@hono/zod-openapi";
import { createChurchSchema } from "../schemas/create-church.schema";

export const createChurchContract = createRoute({
  method: "post",
  path: "/churches",
  tags: ["Churches"],
  security: [{ BearerAuth: [] }],
  summary: "Create a new church",
  request: {
    body: {
      content: {
        "application/json": { schema: createChurchSchema },
      },
    },
  },
  responses: {
    201: { description: "Success" },
    400: { description: "Validation error" },
    409: { description: "User already exists" },
  },
});
