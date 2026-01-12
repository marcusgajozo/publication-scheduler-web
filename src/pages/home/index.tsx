import { RouterLink } from "@/components/router-link";

export function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <RouterLink href="/sign-in">Sign In</RouterLink>
    </>
  );
}
