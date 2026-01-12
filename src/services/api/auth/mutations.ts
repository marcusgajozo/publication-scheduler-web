import { useAuthStore } from "@/stores/use-auth-store";
import { post } from "@/util/methods-client-http";
import { useMutation } from "@tanstack/react-query";
import type z from "zod";
import type { signInSchema } from "./schemas";

export function useSignInMutation() {
  const signIn = useAuthStore((state) => state.signIn);
  return useMutation({
    mutationFn: async (data: z.input<typeof signInSchema>) => {
      const response = await post<{ token: string }>("/sign-in", data);
      signIn("2312");
    },
  });
}
