import z from "zod";
import { Z_Microchip, Z_Update_Microchip_Status } from ".";

export type T_Microchip = z.infer<typeof Z_Microchip>;
export type T_Update_Microchip_Status = z.infer<typeof Z_Update_Microchip_Status>;
