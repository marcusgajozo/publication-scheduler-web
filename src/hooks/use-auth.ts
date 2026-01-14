import { useAuthStore } from "@/stores/use-auth-store";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

export function useAuth() {
  const token = useAuthStore((state) => state.token);

  const userInfo = useMemo(() => {
    if (!token) return null;

    const decoded = jwtDecode(token);
    console.log({ decoded });
  }, [token]);

  return { token, userInfo };
}
