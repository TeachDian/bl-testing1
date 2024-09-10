import z from "zod";
import { Z_Photo } from "../Photo";
import { E_WEB_CONTENTS_STATUS } from "../Web-Contents/enum";

export const Z_News = z.object({
  _id: z.string().optional().nullable(),
  newsTitle: z.string(),
  newsHost: z.string(),
  newsDate: z.union([z.string(), z.date()]),
  photos: z.array(Z_Photo).optional(),
  newsDescription: z.string(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_News = z.object({
  newsTitle: z.string(),
  newsHost: z.string(),
  newsDate: z.union([z.string(), z.date()]),
  photos: z.array(Z_Photo).optional(),
  newsDescription: z.string(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});

export const Z_Update_News_Status = z.object({
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});
