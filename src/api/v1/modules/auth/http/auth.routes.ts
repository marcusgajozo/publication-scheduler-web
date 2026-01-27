import { OpenAPIHono } from "@hono/zod-openapi";
import { AuthController } from "./auth.controller";
import { signInContract, signUpContract } from "./auth.contract";

const app = new OpenAPIHono();
const controller = new AuthController();

app.openapi(signUpContract, (context) => controller.signUp(context));
app.openapi(signInContract, (context) => controller.signIn(context));

export const authModule = app;
