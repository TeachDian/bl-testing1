import z from "zod";

export const Z_About_Us = z.object({
  _id: z.string().optional().nullable(),
  systemName: z.string(),
  systemInformation: z.string(),
  vision: z.string(),
  mission: z.string(),
  version: z.string(),
  systemDescription: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_About_Us = z.object({
  systemName: z.string(),
  systemInformation: z.string(),
  vision: z.string(),
  mission: z.string(),
  version: z.string(),
  systemDescription: z.string(),
});
