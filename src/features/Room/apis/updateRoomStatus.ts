import { supabase } from "../../../libs/supabase";
import { Database } from "../../../types/supabaseSchema";
import { getDefaultRoomId } from "./getDefaultRoomId";

export const updateRoomStatus = async (
  roomStatus: Database["public"]["Enums"]["room_status"]
) => {
  const roomId = await getDefaultRoomId();
  if (!roomId) return null;
  const { error } = await supabase
    .from("rooms")
    .update({ status: roomStatus })
    .eq("id", roomId);

  if (error) {
    // エラーハンドリング: エラーがある場合はここで処理
    console.error("ルームステータスの変更に失敗しました", error);
    throw error;
  }
};
