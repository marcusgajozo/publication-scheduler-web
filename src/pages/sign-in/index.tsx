import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useSignInMutation } from "@/services/api/auth/mutations";
import { signInSchema } from "@/services/api/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

export function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const router = useNavigate();

  const { control, handleSubmit } = useForm<z.input<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn, isPending } = useSignInMutation();

  const handleSumbit = handleSubmit((data) => {
    signIn(data, {
      onSuccess() {
        router("/");
      },
      onError(error) {
        setError(error.message);
      },
    });
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      {error && (
        <div className="text-red-500">
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSumbit} className="w-full max-w-sm space-y-4 p-3">
        <FormInput label="Email" control={control} name="email" />
        <FormInput label="Senha" control={control} name="password" />
        <Button className="w-full" type="submit" disabled={isPending}>
          Entrar
        </Button>
      </form>
    </div>
  );
}
