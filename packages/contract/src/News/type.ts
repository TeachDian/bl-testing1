import z from "zod";
import { Z_News, Z_Update_News, Z_Update_News_Status } from "./zod";

export type T_News = z.infer<typeof Z_News>;
export type T_Update_News = z.infer<typeof Z_Update_News>;
export type T_Update_News_Status = z.infer<typeof Z_Update_News_Status>;
