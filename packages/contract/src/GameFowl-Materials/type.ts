import z from "zod";
import {
  Z_Game_Fowl_Materials,
  Z_Genetic_Composition,
  Z_Update_Game_Fowl_Materials,
} from "./zod";

export type T_Game_Fowl_Materials = z.infer<typeof Z_Game_Fowl_Materials>;
export type T_Update_Game_Fowl_Materials = z.infer<
  typeof Z_Update_Game_Fowl_Materials
>;

export type T_Genetic_Composition = z.infer<typeof Z_Genetic_Composition>;
