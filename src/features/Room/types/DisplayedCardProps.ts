import { Database } from "../../../types/supabaseSchema";
import { DisplayUserInfoProps } from "./DisplayUserInfoProps";

export type DisplayedCardProps = {
  roomName?: string;
  roomStatus?: Database["public"]["Enums"]["room_status"] | null | "招待中"|"デフォルト";
  wakeUpTime?: string;
  penaltyThreshold: number;
  participants: DisplayUserInfoProps[];
};
