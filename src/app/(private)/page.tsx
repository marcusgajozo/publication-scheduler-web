import { IconManager } from "@/components/icon-manager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormScheduling from "./_components/form-scheduling";

export default function RegisterPublicationPage() {
  return (
    <section className="w-full h-full flex items-center justify-center p-5">
      <Card className="w-full max-w-md shadow-lg h-full">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <IconManager name="Form" className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Agendar publicação</CardTitle>
          </div>
          <CardDescription className="text-center">
            Preencha o formulário abaixo para agendar uma nova publicação
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-y-auto flex-1 min-h-0">
          <FormScheduling />
        </CardContent>
        <CardFooter className="py-4">
          <Button
            type="submit"
            id="btnSubmit"
            className="w-full"
            form="scheduling-form"
          >
            Agendar publicação
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
