import z from "zod";

const appBindingsSchema = z.object({
  Variables: z.object({
    user: z.object({
      sub: z.string(),
      email: z.string(),
    }),
  }),
});

export type AppBindings = z.infer<typeof appBindingsSchema>;
