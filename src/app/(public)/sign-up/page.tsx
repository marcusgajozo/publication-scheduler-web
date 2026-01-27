import type { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Create Account | Church Management",
  description: "Create your church management account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <RegisterForm />
    </div>
  );
}
