import { ApiModule } from "@/api/v1/common/api-module";
import { authMiddleware } from "@/api/v1/common/middleware/auth";
import { createChurchContract } from "./church.contract";
import { ChurchController } from "./church.controller";

const app = new ApiModule();
const controller = new ChurchController();

app.use(authMiddleware);

app.openapi(createChurchContract, (context) =>
  controller.createChurch(context)
);

export const churchModule = app;
