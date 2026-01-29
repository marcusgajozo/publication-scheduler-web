import z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  publishNow: z.boolean().optional(),
  scheduleDateTime: z.string().min(1, "Data é obrigatória"),
  repeat: z.boolean().optional(),
  platforms: z.array(z.string()),
  contentType: z.string().min(1, "Tipo de conteúdo é obrigatório"),
  mediaType: z.string().min(1, "Tipo de mídia é obrigatório"),
  media: z.string().min(1, "Mídia é obrigatória"),
  caption: z.string().min(1, "Legenda é obrigatória"),
});
