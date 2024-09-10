import z from "zod";
import { Z_Photo } from "../Photo";

export const Z_Genetic_Composition = z.object({
  input1: z.number(),
  input2: z.number(),
  breedType: z.string(),
  geneticFraction: z.string().optional(),
  geneticPercentage: z.number().optional(),
});

export const Z_Game_Fowl_Materials = z.object({
  _id: z.string().optional().nullable(),
  wingBandNumber: z.string(),
  microchipNumber: z.string(),
  markings: z.string(),
  dateOfBirth: z.date(),
  gender: z.string(),
  bodyColor: z.string(),
  legColor: z.string(),
  originFarm: z.string(),
  vaccine: z.string(),
  status: z.string(),
  geneticComposition: z.array(Z_Genetic_Composition),
  //TODO: The value of comb will be from the database comb in breeder settings
  comb: z.string(),
  history: z.string(),
  miscellaneous: z.string(),
  photos: z.array(Z_Photo).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});

export const Z_Update_Game_Fowl_Materials = z.object({
  wingBandNumber: z.string(),
  microchipNumber: z.string(),
  markings: z.string(),
  dateOfBirth: z.date(),
  gender: z.string(),
  bodyColor: z.string(),
  legColor: z.string(),
  originFarm: z.string(),
  vaccine: z.string(),
  status: z.string(),
  geneticComposition: z.array(Z_Genetic_Composition),
  //TODO: The value of comb will be from the database comb in breeder settings
  comb: z.string(),
  history: z.string(),
  miscellaneous: z.string(),
  photos: z.array(Z_Photo).optional(),
});
