import { atomWithStorage } from "jotai/utils";
import { Database, Tables } from "../types/supabaseSchema";

export const defaultRoomIdAtom = atomWithStorage<number | null>(
  "DEFAULTROOM",
  null
);
