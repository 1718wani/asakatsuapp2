import { atomWithStorage } from "jotai/utils";
import { Database, Tables } from "../types/supabaseSchema";

export const defaultRoomAtom = atomWithStorage<Tables<"rooms"> | null>(
  "DEFAULTROOM",
  null
);
