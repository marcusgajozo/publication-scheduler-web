import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ApiError } from "./api-error";

export const globalErrorHandler = (error: Error, context: Context) => {
  if (error instanceof ApiError) {
    return context.json({ error: error.message }, error.statusCode);
  }

  if (error instanceof HTTPException) {
    return context.json({ error: error.message }, error.status);
  }

  if (error instanceof Error) {
    return context.json({ error: error.message }, 400);
  }

  return context.json({ error: "Internal Server Error" }, 500);
};
