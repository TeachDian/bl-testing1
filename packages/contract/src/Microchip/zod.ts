import z from "zod";
import { E_Microchip_Status } from ".";

export const Z_Microchip = z.object({
  _id: z.string().optional().nullable(),
  microchipId: z.string(),
  microchipStatus: z.nativeEnum(E_Microchip_Status),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Microchip_Status = z.object({
  microchipStatus: z.nativeEnum(E_Microchip_Status),
});
