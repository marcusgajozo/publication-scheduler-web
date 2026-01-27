import { createRoute } from "@hono/zod-openapi";
import { signInSchema } from "../schemas/sign-in.schema";
import { signUpSchema } from "../schemas/sign-up.schema";

export const signUpContract = createRoute({
  method: "post",
  path: "/sign-up",
  tags: ["Authentication"],
  summary: "Create a new account",
  request: {
    body: {
      content: {
        "application/json": { schema: signUpSchema },
      },
    },
  },
  responses: {
    201: { description: "Success" },
    400: { description: "Validation error" },
    409: { description: "User already exists" },
  },
});

export const signInContract = createRoute({
  method: "post",
  path: "/sign-in",
  tags: ["Authentication"],
  summary: "Sign in",
  request: {
    body: {
      content: {
        "application/json": { schema: signInSchema },
      },
    },
  },
  responses: {
    200: { description: "Success" },
  },
});
