"use client";

import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../_schemas/form.schema";
import { z } from "zod";
import { FormSelect } from "@/components/form/form-select";

export default function FormScheduling() {
  const methods = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      id="scheduling-form"
      action=""
      className="space-y-4 pb-4"
      onSubmit={handleSubmit}
    >
      <FormInput
        control={methods.control}
        name="title"
        label="Título"
        placeholder="Título da publicação"
      />
      <FormCheckbox
        control={methods.control}
        name="publishNow"
        label="Publicar agora"
      />
      <FormCheckbox control={methods.control} name="repeat" label="Repetir" />
      <FormInput
        control={methods.control}
        name="scheduleDateTime"
        label="Data e hora"
        placeholder="Data e hora da publicação"
      />
      <FormSelect
        control={methods.control}
        name="platforms"
        label="Plataformas"
        placeholder="Plataformas"
        selectItems={[
          { value: "Instagram", label: "Instagram" },
          { value: "WhatsApp", label: "WhatsApp" },
          { value: "Facebook", label: "Facebook" },
        ]}
      />
      <FormInput
        control={methods.control}
        name="contentType"
        label="Tipo de conteúdo"
        placeholder="Tipo de conteúdo"
      />
      <FormInput
        control={methods.control}
        name="mediaType"
        label="Tipo de mídia"
        placeholder="Tipo de mídia"
      />
      <FormInput
        control={methods.control}
        name="media"
        label="Mídia"
        placeholder="Mídia"
        type="file"
      />
      <FormInput
        control={methods.control}
        name="caption"
        label="Legenda"
        placeholder="Legenda"
      />
    </form>
  );
}
