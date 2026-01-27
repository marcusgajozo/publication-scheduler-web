"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInSchema } from "../../_schemas/sign-in.schema";
import { signInAction } from "../../_actions/sign-in.action";

export function FormSignIn() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, startTransition] = useTransition();

  const methods = useForm<z.input<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    startTransition(async () => {
      setError(undefined);
      const result = await signInAction(data);
      setError(result.error);
    });
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <FormInput label="Email" control={methods.control} name="email" />
      </div>

      <div className="space-y-2">
        <FormInput
          label="Senha"
          control={methods.control}
          name="password"
          type="password"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label
          htmlFor="remember"
          className="text-sm font-normal cursor-pointer"
        >
          Lembrar-me
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <div>
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {"Não tem uma conta? "}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
