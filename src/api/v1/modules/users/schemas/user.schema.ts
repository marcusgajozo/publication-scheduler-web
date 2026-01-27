import { baseEntitySchema } from "@/api/v1/common/schemas/base-entity.schema";
import z from "zod";

export const userSchema = baseEntitySchema.extend({
  name: z.string(),
  email: z.email(),
  passwordHash: z.string(),
});

export type TUser = z.infer<typeof userSchema>;
