import z from "zod";
import { Z_Breeding_Pens, Z_For_Breeding } from "./zod";

export type T_Breeding_Pens = z.infer<typeof Z_Breeding_Pens>;
export type T_For_Breeding = z.infer<typeof Z_For_Breeding>;
