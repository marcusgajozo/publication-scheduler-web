import z from "zod";
import { baseEntitySchema } from "../schemas/base-entity.schema";

export type BaseEntity = z.infer<typeof baseEntitySchema>;
