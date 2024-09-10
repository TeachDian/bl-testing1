import { z } from "zod";
import { E_UserRole } from "..";

export const Z_Session = z.object({
  _id: z.string().nullable(),
  email: z.string().nullable(),
  registrationType: z.string().nullable(),
  role: z.nativeEnum(E_UserRole),
});
