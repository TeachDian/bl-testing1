import z from "zod";

// Breeding Season
export const Z_Breeding_Season = z.object({
  _id: z.string().optional().nullable(),
  breedingSeasonTitle: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Breeding_Season = z.object({
  breedingSeasonTitle: z.string(),
});

// Body Color
export const Z_Game_Fowl_Body_Color = z.object({
  _id: z.string().optional().nullable(),
  colorTitle: z.string(),
  colorDetails: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Body_Color = z.object({
  colorTitle: z.string(),
  colorDetails: z.string(),
});

// Class
export const Z_Game_Fowl_Class = z.object({
  _id: z.string().optional().nullable(),
  classTitle: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Class = z.object({
  classTitle: z.string(),
});

// Federation
export const Z_Game_Fowl_Federation = z.object({
  _id: z.string().optional().nullable(),
  federationTitle: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Federation = z.object({
  federationTitle: z.string(),
});

// Gender
export const Z_Game_Fowl_Gender = z.object({
  _id: z.string().optional().nullable(),
  genderTitle: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Gender = z.object({
  genderTitle: z.string(),
});

// Leg Color
export const Z_Game_Fowl_Leg_Color = z.object({
  _id: z.string().optional().nullable(),
  legColorTitle: z.string(),
  legColorDetails: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Leg_Color = z.object({
  legColorTitle: z.string(),
  legColorDetails: z.string(),
});

// Skills
export const Z_Game_Fowl_Skills = z.object({
  _id: z.string().optional().nullable(),
  gameFowlType: z.string(),
  gameFowlSkillsCategory: z.string(),
  gameFowlSkillSet: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Skills = z.object({
  gameFowlType: z.string(),
  gameFowlSkillsCategory: z.string(),
  gameFowlSkillSet: z.string(),
});

// Skills Category
export const Z_Game_Fowl_Skills_Category = z.object({
  _id: z.string().optional().nullable(),
  skillsCategory: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Skills_Category = z.object({
  _id: z.string().optional().nullable(),
  skillsCategory: z.string(),
});

// Status
export const Z_Game_Fowl_Status = z.object({
  _id: z.string().optional().nullable(),
  gameFowlGender: z.string(),
  gameFowlStatus: z.string(),
  gameFowlAgeRange: z.number(),
  description: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Status = z.object({
  gameFowlGender: z.string(),
  gameFowlStatus: z.string(),
  gameFowlAgeRange: z.number(),
  description: z.string(),
});

// Traits
export const Z_Game_Fowl_Traits = z.object({
  _id: z.string().optional().nullable(),
  gameFowlType: z.string(),
  gameFowlTraitsCategory: z.string(),
  gameFowlTraitsSet: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Traits = z.object({
  gameFowlType: z.string(),
  gameFowlTraitsCategory: z.string(),
  gameFowlTraitsSet: z.string(),
});

// Traits Category
export const Z_Game_Fowl_Traits_Category = z.object({
  _id: z.string().optional().nullable(),
  traitsCategory: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Traits_Category = z.object({
  traitsCategory: z.string(),
});

// Type
export const Z_Game_Fowl_Type = z.object({
  _id: z.string().optional().nullable(),
  gameFowlClass: z.string(),
  gameFowlType: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Type = z.object({
  gameFowlClass: z.string(),
  gameFowlType: z.string(),
});

// Comb
export const Z_Game_Fowl_Comb = z.object({
  comb: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Comb = z.object({
  comb: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

// Local Association
export const Z_Game_Fowl_Local_Association = z.object({
  _id: z.string().optional().nullable(),
  localAssociation: z.string(),
  federation: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Local_Association = z.object({
  localAssociation: z.string(),
  federation: z.string(),
});
