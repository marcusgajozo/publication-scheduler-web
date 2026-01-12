import { useForm } from "react-hook-form";
import type z from "zod";
import { signInSchema } from "./schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useSignInMutation } from "@/services/api/auth/mutations";

export function SignIn() {
  const { control, handleSubmit } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn } = useSignInMutation();

  const handleSumbit = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSumbit}>
        <FormInput label="Email" control={control} name="email" />
        <FormInput label="Senha" control={control} name="password" />
        <Button>Entrar</Button>
      </form>
    </div>
  );
}
