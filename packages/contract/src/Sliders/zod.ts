import z from "zod";
import { E_WEB_CONTENTS_STATUS } from "../Web-Contents/enum";
import { Z_Photo } from "../Photo";

export const Z_Sliders = z.object({
  _id: z.string().optional().nullable(),
  photos: z.array(Z_Photo).optional(),
  sliderDescription: z.string().optional(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Sliders = z.object({
  photos: z.array(Z_Photo).optional(),
  sliderDescription: z.string().optional(),
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});

export const Z_Update_Slider_Status = z.object({
  status: z.nativeEnum(E_WEB_CONTENTS_STATUS).optional(),
});
