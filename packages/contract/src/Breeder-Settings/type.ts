import z from "zod";
import {
  Z_Game_Fowl_Body_Color,
  Z_Breeding_Season,
  Z_Game_Fowl_Class,
  Z_Game_Fowl_Federation,
  Z_Game_Fowl_Gender,
  Z_Game_Fowl_Leg_Color,
  Z_Game_Fowl_Local_Association,
  Z_Game_Fowl_Skills,
  Z_Game_Fowl_Skills_Category,
  Z_Game_Fowl_Status,
  Z_Game_Fowl_Traits,
  Z_Game_Fowl_Traits_Category,
  Z_Game_Fowl_Type,
  Z_Update_Game_Fowl_Body_Color,
  Z_Update_Breeding_Season,
  Z_Update_Game_Fowl_Class,
  Z_Update_Game_Fowl_Federation,
  Z_Update_Game_Fowl_Gender,
  Z_Update_Game_Fowl_Leg_Color,
  Z_Update_Game_Fowl_Local_Association,
  Z_Update_Game_Fowl_Skills,
  Z_Update_Game_Fowl_Skills_Category,
  Z_Update_Game_Fowl_Status,
  Z_Update_Game_Fowl_Traits,
  Z_Update_Game_Fowl_Traits_Category,
  Z_Update_Game_Fowl_Type,
  Z_Game_Fowl_Comb,
  Z_Update_Game_Fowl_Comb,
} from "./zod";

// Breeding Season
export type T_Breeding_Season = z.infer<typeof Z_Breeding_Season>;
export type T_Update_Breeding_Season = z.infer<typeof Z_Update_Breeding_Season>;

// Body Color
export type T_Game_Fowl_Body_Color = z.infer<typeof Z_Game_Fowl_Body_Color>;
export type T_Update_Game_Fowl_Body_Color = z.infer<
  typeof Z_Update_Game_Fowl_Body_Color
>;

// Class
export type T_Game_Fowl_Class = z.infer<typeof Z_Game_Fowl_Class>;
export type T_Update_Game_Fowl_Class = z.infer<typeof Z_Update_Game_Fowl_Class>;

// Federation
export type T_Game_Fowl_Federation = z.infer<typeof Z_Game_Fowl_Federation>;
export type T_Update_Game_Fowl_Federation = z.infer<
  typeof Z_Update_Game_Fowl_Federation
>;

// Gender
export type T_Game_Fowl_Gender = z.infer<typeof Z_Game_Fowl_Gender>;
export type T_Update_Game_Fowl_Gender = z.infer<
  typeof Z_Update_Game_Fowl_Gender
>;

// Leg Color
export type T_Game_Fowl_Leg_Color = z.infer<typeof Z_Game_Fowl_Leg_Color>;
export type T_Update_Game_Fowl_Leg_Color = z.infer<
  typeof Z_Update_Game_Fowl_Leg_Color
>;

// Skills
export type T_Game_Fowl_Skills = z.infer<typeof Z_Game_Fowl_Skills>;
export type T_Update_Game_Fowl_Skills = z.infer<
  typeof Z_Update_Game_Fowl_Skills
>;

// Skills Category
export type T_Game_Fowl_Skills_Category = z.infer<
  typeof Z_Game_Fowl_Skills_Category
>;
export type T_Update_Game_Fowl_Skills_Category = z.infer<
  typeof Z_Update_Game_Fowl_Skills_Category
>;

// Status
export type T_Game_Fowl_Status = z.infer<typeof Z_Game_Fowl_Status>;
export type T_Update_Game_Fowl_Status = z.infer<
  typeof Z_Update_Game_Fowl_Status
>;

// Traits
export type T_Game_Fowl_Traits = z.infer<typeof Z_Game_Fowl_Traits>;
export type T_Update_Game_Fowl_Traits = z.infer<
  typeof Z_Update_Game_Fowl_Traits
>;

// Traits Category
export type T_Game_Fowl_Traits_Category = z.infer<
  typeof Z_Game_Fowl_Traits_Category
>;
export type T_Update_Game_Fowl_Traits_Category = z.infer<
  typeof Z_Update_Game_Fowl_Traits_Category
>;

// Type
export type T_Game_Fowl_Type = z.infer<typeof Z_Game_Fowl_Type>;
export type T_Update_Game_Fowl_Type = z.infer<typeof Z_Update_Game_Fowl_Type>;

// Comb
export type T_Game_Fowl_Comb = z.infer<typeof Z_Game_Fowl_Comb>;
export type T_Update_Game_Fowl_Comb = z.infer<typeof Z_Update_Game_Fowl_Comb>;

// Local Association
export type T_Game_Fowl_Local_Association = z.infer<
  typeof Z_Game_Fowl_Local_Association
>;
export type T_Update_Game_Fowl_Local_Association = z.infer<
  typeof Z_Update_Game_Fowl_Local_Association
>;
