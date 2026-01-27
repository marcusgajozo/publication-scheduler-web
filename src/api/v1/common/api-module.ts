import { OpenAPIHono, OpenAPIHonoOptions } from "@hono/zod-openapi";
import { AppBindings } from "./schemas/app-variables.schema";

export class ApiModule extends OpenAPIHono<AppBindings> {
  constructor(options?: OpenAPIHonoOptions<AppBindings>) {
    super({
      ...options,
      defaultHook: (result, c) => {
        if (!result.success) {
          return c.json(
            {
              error: "Validation Error",
              details: result.error.flatten(),
            },
            400
          );
        }
      },
    });
  }
}
