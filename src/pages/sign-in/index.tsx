import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useSignInMutation } from "@/services/api/auth/mutations";
import { signInSchema } from "@/services/api/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type z from "zod";

export function SignIn() {
  const router = useNavigate();

  const { control, handleSubmit } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn } = useSignInMutation();

  const handleSumbit = handleSubmit((data) => {
    signIn(data, {
      onSuccess() {
        router("/dashboard");
      },
    });
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSumbit} className="w-full max-w-sm space-y-4 p-3">
        <FormInput label="Email" control={control} name="email" />
        <FormInput label="Senha" control={control} name="password" />
        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}
