import z from "zod";
import { Z_Update_Videos, Z_Videos } from "./zod";

export type T_Videos = z.infer<typeof Z_Videos>;
export type T_Update_Videos = z.infer<typeof Z_Update_Videos>;
