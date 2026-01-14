import { SchedulingForm } from "@/pages/scheduling-form";
import type { RouteObject } from "react-router";

export const privateRouter: RouteObject[] = [
  {
    path: "/",
    Component: SchedulingForm,
  },
];
