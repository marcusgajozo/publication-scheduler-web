import { createBrowserRouter } from "react-router";
import { SignIn } from "../pages/sign-in";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    Component: SignIn,
  },
]);
