import { baseEntitySchema } from "@/api/v1/common/schemas/base-entity.schema";
import z from "zod";

export const churchSchema = baseEntitySchema.extend({
  name: z.string(),
  active: z.boolean().default(true),
});

export type Church = z.infer<typeof churchSchema>;
