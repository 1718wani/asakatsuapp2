import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const updateDefaultRoomId = async (roomId: number) => {
  const userId = await getUserId();
  const { error } = await supabase
    .from("profiles")
    .update({ default_room_id: roomId })
    .eq("id", userId);

  if (error) {
    // エラーハンドリング: エラーがある場合はここで処理
    console.error("デフォルトIDの更新に失敗しました。", error);
    throw error;
  }
};
