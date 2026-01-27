import { Context } from "hono";
import { ChurchFactory } from "../factories/church.factory";
import { AppBindings } from "@/api/v1/common/schemas/app-variables.schema";

export class ChurchController {
  async createChurch(context: Context<AppBindings>) {
    const { name } = await context.req.json();

    const useCase = ChurchFactory.makeCreateChurch();
    const result = await useCase.execute({ name });

    return context.json(result, 201);
  }
}
