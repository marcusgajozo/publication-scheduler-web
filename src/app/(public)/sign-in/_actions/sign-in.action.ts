"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema } from "../_schemas/sign-in.schema";

export type AuthState = {
  error?: string;
};

export async function signInAction(
  data: z.infer<typeof signInSchema>
): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch {
    return { error: "Falha ao fazer login. Verifique suas credenciais." };
  }

  redirect("/");
}
