import { supabase } from "../../../libs/supabase";
import { Database } from "../../../types/supabaseSchema";

export const updateRoomStatus = async (
  roomStatus: Database["public"]["Enums"]["room_status"],
  roomId: number
) => {
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
