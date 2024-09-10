import z from "zod";

export const Z_For_Breeding = z.object({
  broodCock: z.string(),
  broodHen: z.string(),
});

export const Z_Breeding_Pens = z.object({
  _id: z.string().optional().nullable(),
  breedingSeason: z.string().optional(),
  breedingDate: z.union([z.string(), z.date()]).optional(),
  breedingPen: z.string().optional(),
  forBreeding: z.array(Z_For_Breeding),
  offspringMarkings: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});
