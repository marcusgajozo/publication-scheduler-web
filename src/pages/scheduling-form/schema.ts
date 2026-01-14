import z from "zod";

export const schedulingFormSchema = z.object({
  title: z.string(),
  publishNow: z.boolean(),
  scheduledDate: z.string().optional(),
  scheduleHour: z.string().optional(),
  isRecurrent: z.boolean(),
  platforms: z.array(z.enum(["facebook", "instagram", "whatsapp"])),
  typeOfContent: z.enum(["post", "reels", "carousel"]),
  typeOfMedia: z.enum(["image", "video", "text", "mixed"]),
  media: z.array(z.string()),
  caption: z.string().optional(),
});
