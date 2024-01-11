import { supabase } from "../../../libs/supabase";
import { Database } from "../../../types/supabaseSchema";
import { getUserId } from "../../User/apis/getUserId";

export const updateRoomMemberStatus = async (
  roomId: number,
  newStatus: Database["public"]["Enums"]["room_member_status"]
) => {
  const userId = await getUserId();
  const { error } = await supabase
    .from("room_members")
    .update({ status: newStatus })
    .match({ user_id: userId, room_id: roomId });

  if (error) {
    console.error("RoomMemberのステータスの変更に失敗しました", error);
    throw error;
  }
};
