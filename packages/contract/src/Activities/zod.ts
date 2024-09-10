import z from "zod";
import { Z_Photo } from "../Photo";
import { E_WEB_CONTENTS_STATUS } from "../Web-Contents/enum";

export const Z_Activities = z.object({
  _id: z.string().optional().nullable(),
  activityTitle: z.string(),
  activityHost: z.string(),
  activityDate: z.union([z.string(), z.date()]),
  photos: z.array(Z_Photo).optional(),
  activityDescription: z.string(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Activities = z.object({
  _id: z.string(),
  activityTitle: z.string(),
  activityHost: z.string(),
  activityDate: z.union([z.string(), z.date()]),
  photos: z.array(Z_Photo).optional(),
  activityDescription: z.string(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});

export const Z_Update_Activity_Status = z.object({
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});
