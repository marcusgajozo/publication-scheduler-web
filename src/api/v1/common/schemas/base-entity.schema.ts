import z from "zod";

export const baseEntitySchema = z.object({
  id: z.uuid().describe("Unique identifier"),
  createdAt: z.date().describe("Creation timestamp"),
  updatedAt: z.date().describe("Last update timestamp"),
  deletedAt: z
    .date()
    .nullable()
    .describe("Deletion timestamp, null if not deleted"),
});
