import z from "zod";
import { Z_Photo } from "../Photo";
import { E_WEB_CONTENTS_STATUS } from "../Web-Contents/enum";

export const Z_Events = z.object({
  _id: z.string().optional().nullable(),
  eventTitle: z.string(),
  eventDates: z.union([z.string(), z.array(z.string())]),
  photos: z.array(Z_Photo).optional(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
  eventDescription: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Events = z.object({
  eventTitle: z.string(),
  eventDates: z.union([z.string(), z.date()]),
  photos: z.array(Z_Photo).optional(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
  eventDescription: z.string(),
});

export const Z_Update_Event_Status = z.object({
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});
