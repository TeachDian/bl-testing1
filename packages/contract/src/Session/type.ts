import { z } from "zod";
import { Z_Session } from "./zod";

export type T_Session = z.infer<typeof Z_Session>;
