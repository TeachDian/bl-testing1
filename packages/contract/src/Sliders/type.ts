import z from "zod";
import { Z_Sliders, Z_Update_Slider_Status, Z_Update_Sliders } from "./zod";

export type T_Sliders = z.infer<typeof Z_Sliders>;
export type T_Update_Sliders = z.infer<typeof Z_Update_Sliders>;
export type T_Update_Slider_Status = z.infer<typeof Z_Update_Slider_Status>;
