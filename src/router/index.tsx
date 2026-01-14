import { verifyIsAuthLoader } from "@/util/verify-is-auth-loader";
import { createHashRouter } from "react-router";
import { privateRouter } from "./private-router";
import { publicRouter } from "./public-router";

export const router = createHashRouter([
  {
    children: [...privateRouter],
    loader: verifyIsAuthLoader,
  },
  {
    children: [...publicRouter],
    loader: verifyIsAuthLoader,
  },
]);
