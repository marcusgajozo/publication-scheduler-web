import { SignIn } from "@/pages/sign-in";
import type { RouteObject } from "react-router";

export const publicRouter: RouteObject[] = [
  {
    path: "/sign-in",
    Component: SignIn,
  },
];
