import z from "zod";
import { userSchema } from "./user.schema";

export const createUserSchema = userSchema.pick({
  email: true,
  name: true,
  passwordHash: true,
});

export type TCreateUser = z.infer<typeof createUserSchema>;
