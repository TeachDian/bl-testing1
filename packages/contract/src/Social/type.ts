import z from "zod";
import { Z_Social_Links, Z_Update_Social_Links } from "./zod";

export type T_Social_Links = z.infer<typeof Z_Social_Links>;
export type T_Update_Social_Links = z.infer<typeof Z_Update_Social_Links>;
