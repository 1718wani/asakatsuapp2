import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";
import { getDefaultRoomId } from "./getDefaultRoomId";

export const getDefaultRoomForRoomsListDisplay = async () => {
  const defaultRoomId = await getDefaultRoomId();
  // デフォルトルームがない場合Nullが返される
  if (!defaultRoomId) return null;
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("room_members")
    .select(
      `
      room_id,
      rooms (
        *,
        rules (
          penalty_threshold,
          wakeup_time
        ),
        room_members (
          failure_count,
          profiles (
            id,
            user_name,
            avatar_url,
            default_room_id
          )
        )
      )
    `
    )
    .eq("user_id", userId)
    .eq("room_id", defaultRoomId)
    .single();

  if (error) {
    console.error(
      "デフォルトルームとその付随情報取得でエラーが出ました",
      error
    );
    throw error;
  }

  // userIdと一致しているRoom_membersを並べ替える。
  if (data && data.rooms && data.rooms.room_members) {
    const sortedRoomMembers = data.rooms.room_members.sort((a, b) => {
      return a.profiles?.id === userId ? -1 : b.profiles?.id === userId ? 1 : 0;
    });
    data.rooms.room_members = sortedRoomMembers;
  }

  return data;
};
