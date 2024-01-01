import { router } from "expo-router";
import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

// ユーザーのデフォルトルーム情報を取得する関数
export const getDefaultRoom = async () => {
  try {
    const userId = await getUserId();

    // ユーザーのデフォルトルームIDを取得
    const { data: defaultRoomId, error: defaultRoomIdError } = await supabase
      .from("profiles")
      .select("default_room")
      .eq("id", userId)
      .single();

    if (defaultRoomIdError) throw new Error("デフォルトルームIDの取得に失敗しました");
    if (defaultRoomId.default_room === null) return defaultRoomId.default_room;

    if (defaultRoomId) {
      // ルームの情報を取得
      const { data: room, error: roomError } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", defaultRoomId.default_room)
        .single();

      if (roomError) throw new Error("デフォルトルーム情報の取得に失敗しました");

      return room;
    }
  } catch (error) {
    console.error("getDefaultRoomでエラー:", error);
    throw error;
  }
};
