import { useAuthStore } from "@/stores/use-auth-store";
import { redirect, type LoaderFunctionArgs } from "react-router";

export function verifyIsAuthLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isSignInPage = pathname === "/sign-in";
  const token = useAuthStore.getState().token;

  if (!token && !isSignInPage) {
    const params = new URLSearchParams();
    params.set("redirectTo", pathname);
    return redirect(`/sign-in?${params.toString()}`);
  }

  if (token && isSignInPage) {
    return redirect("/");
  }

  return null;
}
