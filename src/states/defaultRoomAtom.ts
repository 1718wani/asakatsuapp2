import { atomWithStorage } from "jotai/utils";

export const defaultRoomIdAtom = atomWithStorage<number | null>(
  "DEFAULTROOM",
  null
);
