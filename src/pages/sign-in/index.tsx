import { useForm } from "react-hook-form";
import type z from "zod";
import { signInSchema } from "./schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/form-input";

export function SignIn() {
  const { control } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <FormInput control={control} name="email" />
        <FormInput control={control} name="password" />
      </div>
    </div>
  );
}
