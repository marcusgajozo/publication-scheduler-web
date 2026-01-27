import { baseEntitySchema } from "@/api/v1/common/schemas/base-entity.schema";
import z from "zod";

export const memberSchema = baseEntitySchema.extend({
  name: z.string(),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  isBaptized: z.boolean().default(false),
});

export type Member = z.infer<typeof memberSchema>;
