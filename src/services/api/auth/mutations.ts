import { useMutation } from "@tanstack/react-query";

export function useSignInMutation() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      // Implement your sign-in logic here, e.g., call an API endpoint
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      return response.json();
    },
  });
}
