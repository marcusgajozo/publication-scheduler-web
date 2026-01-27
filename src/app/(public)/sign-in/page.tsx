import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Church } from "lucide-react";
import { FormSignIn } from "./_components/form-sign-in";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Church className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Bem-vindo(a) de volta</CardTitle>
            <CardDescription className="mt-2">
              Faça login na sua conta de gerenciamento da igreja
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <FormSignIn />
        </CardContent>
      </Card>
    </div>
  );
}
