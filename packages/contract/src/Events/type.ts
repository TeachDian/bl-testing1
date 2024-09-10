import z from "zod";
import { Z_Events, Z_Update_Event_Status, Z_Update_Events } from "./zod";

export type T_Events = z.infer<typeof Z_Events>;
export type T_Update_Events = z.infer<typeof Z_Update_Events>;
export type T_Update_Event_Status = z.infer<typeof Z_Update_Event_Status>;
