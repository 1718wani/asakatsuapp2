import { Database } from "../../../types/supabaseSchema";

type RoomMemberWithProfile = {
  profiles: Database["public"]["Tables"]["profiles"]["Row"] | null;
};

export type DisplayedCardProps = {
  roomId: number;
  roomName?: string;
  myStatus: Database["public"]["Enums"]["room_member_status"];
  wakeUpTime?: string;
  purpose?: string;
  participants: RoomMemberWithProfile[];
};
