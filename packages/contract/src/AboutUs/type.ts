import z from "zod";
import { Z_About_Us, Z_Update_About_Us } from "./zod";

export type T_About_Us = z.infer<typeof Z_About_Us>;
export type T_Update_About_Us = z.infer<typeof Z_Update_About_Us>;
