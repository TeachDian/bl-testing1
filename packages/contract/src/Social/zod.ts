import z from "zod";

export const Z_Social_Links = z.object({
  _id: z.string().optional().nullable(),
  facebook: z.string(),
  twitter: z.string(),
  instagram: z.string(),
  tikTok: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Social_Links = z.object({
  facebook: z.string(),
  twitter: z.string(),
  instagram: z.string(),
  tikTok: z.string(),
});
