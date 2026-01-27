import { Context } from "hono";
import { AuthFactory } from "../factories/auth.factory";

export class AuthController {
  async signUp(context: Context) {
    const { name, email, password } = await context.req.json();

    const useCase = AuthFactory.makeSignUp();
    const result = await useCase.execute({ name, email, password });

    return context.json(result, 201);
  }

  async signIn(context: Context) {
    const { email, password } = await context.req.json();

    const useCase = AuthFactory.makeSignIn();
    const result = await useCase.execute({ email, password });

    return context.json(result, 200);
  }
}
