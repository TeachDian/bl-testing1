import z from "zod";
import { Z_Photo } from "../Photo";
import { E_WEB_CONTENTS_STATUS } from "../Web-Contents/enum";

export const Z_Billboards = z.object({
  _id: z.string().optional().nullable(),
  photos: z.array(Z_Photo).optional(),
  startDate: z.union([z.string(), z.date()]),
  endDate: z.union([z.string(), z.date()]),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Billboards = z.object({
  photos: z.array(Z_Photo).optional(),
  startDate: z.union([z.string(), z.date()]),
  endDate: z.union([z.string(), z.date()]),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});

export const Z_Update_Billboard_Status = z.object({
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});
