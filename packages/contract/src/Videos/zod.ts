import z from "zod";

export const Z_Videos = z.object({
  _id: z.string().optional().nullable(),
  videoTitle: z.string(),
  videoDate: z.union([z.string(), z.date()]),
  videoHost: z.string(),
  // video embeddings
  videoLink: z.string(),
  videoDescription: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Videos = z.object({
  videoTitle: z.string(),
  videoDate: z.union([z.string(), z.date()]),
  videoHost: z.string(),
  // video embeddings
  videoLink: z.string(),
  videoDescription: z.string(),
});
