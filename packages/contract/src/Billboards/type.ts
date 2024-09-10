import z from "zod";
import {
  Z_Billboards,
  Z_Update_Billboard_Status,
  Z_Update_Billboards,
} from "./zod";

export type T_Billboards = z.infer<typeof Z_Billboards>;
export type T_Update_Billboards = z.infer<typeof Z_Update_Billboards>;
export type T_Update_Billboard_Status = z.infer<
  typeof Z_Update_Billboard_Status
>;
