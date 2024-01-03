import { Database } from "../../../types/supabaseSchema";

export type DisplayedCardProps = {
  roomName?: string;
  roomStatus?: Database["public"]["Enums"]["room_status"] | null;
  wakeUpTime?: string;
  penaltyThreshold: number;
  failureCount?: number;
  participantsName?: string[];
  avatarUrls: string[];
};
