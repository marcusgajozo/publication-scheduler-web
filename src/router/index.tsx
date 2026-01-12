import { createHashRouter } from "react-router";
import { SignIn } from "@/pages/sign-in";
import { Home } from "@/pages/home";

export const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/sign-in",
    Component: SignIn,
  },
]);
