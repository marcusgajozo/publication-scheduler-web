import z from "zod";
import { churchSchema } from "./member.schema";

export const createChurchSchema = churchSchema.pick({
  name: true,
});

export type CreateChurch = z.infer<typeof createChurchSchema>;
