import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Insira um e-mail válido"),
  password: z.string().min(1, "A senha deve ter no mínimo 1 caractere"),
});
