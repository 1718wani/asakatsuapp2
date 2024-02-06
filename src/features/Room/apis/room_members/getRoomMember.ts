import { supabase } from "../../../../libs/supabase";

export const getRoomMember = async (roomId: number, userId: string) => {
  const { data, error } = await supabase
    .from("room_members")
    .select("*")
    .eq("user_id", userId)
    .eq("room_id", roomId)
    .single();

  if (error) {
    console.error("自分のRoomMember取得において失敗しました", error);
    throw error;
  }

  return data;
};
