"use client";

import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormInput } from "@/components/form/form-input";
import { FormMultiSelect } from "@/components/form/form-multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../_schemas/form.schema";
import { CONTENT_TYPES, MEDIA_TYPES, PLATFORMS } from "../../_constants/form";
import { FormSelect } from "@/components/form/form-select";
import { useMemo } from "react";

export default function FormScheduling() {
  const methods = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  const platforms = methods.watch("platforms");
  const contentType = methods.watch("contentType");
  const mediaType = methods.watch("mediaType");

  const isDisabledContentType = useMemo(() => {
    return platforms?.length === 0;
  }, [platforms]);

  const isDisabledMediaType = useMemo(() => {
    return !contentType;
  }, [contentType]);

  const isDisabledMedia = useMemo(() => {
    return mediaType === "text";
  }, [mediaType]);

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
        data-testid="input-title"
      />
      <FormCheckbox
        control={methods.control}
        name="publishNow"
        label="Publicar agora"
        data-testid="checkbox-publish-now"
      />
      <FormCheckbox
        control={methods.control}
        name="repeat"
        label="Repetir"
        data-testid="checkbox-repeat"
      />
      <FormInput
        control={methods.control}
        name="scheduleDateTime"
        label="Data e hora"
        placeholder="Data e hora da publicação"
        data-testid="input-schedule-date-time"
      />
      <FormMultiSelect
        control={methods.control}
        name="platforms"
        label="Plataformas"
        placeholder="Plataformas"
        searchable
        options={PLATFORMS}
        data-testid="multi-select-platforms"
      />
      <FormSelect
        control={methods.control}
        name="contentType"
        label="Tipo de conteúdo"
        placeholder="Tipo de conteúdo"
        options={CONTENT_TYPES}
        data-testid="select-content-type"
        disabled={isDisabledContentType}
      />
      <FormSelect
        control={methods.control}
        name="mediaType"
        label="Tipo de mídia"
        placeholder="Tipo de mídia"
        options={MEDIA_TYPES}
        data-testid="select-media-type"
        disabled={isDisabledMediaType}
      />
      <FormInput
        control={methods.control}
        name="media"
        label="Mídia"
        placeholder="Mídia"
        type="file"
        data-testid="input-media"
        disabled={isDisabledMedia}
      />
      <FormInput
        control={methods.control}
        name="caption"
        label="Legenda"
        placeholder="Legenda"
        data-testid="input-caption"
      />
    </form>
  );
}
