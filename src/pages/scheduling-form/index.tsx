import { RouterLink } from "@/components/router-link";
import { useAuth } from "@/hooks/use-auth";

export function SchedulingForm() {
  useAuth();
  return (
    <div className="">
      <h1>Home Page</h1>
      <RouterLink href="/sign-in">Sign In</RouterLink>
    </div>
  );
}
