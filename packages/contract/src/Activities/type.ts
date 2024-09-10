import z from "zod";
import {
  Z_Activities,
  Z_Update_Activities,
  Z_Update_Activity_Status,
} from "./zod";

export type T_Activities = z.infer<typeof Z_Activities>;
export type T_Update_Activities = z.infer<typeof Z_Update_Activities>;
export type T_Update_Activity_Status = z.infer<typeof Z_Update_Activity_Status>;
