import { router } from "expo-router";
import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getDefaultRoomId = async () => {
  const userId = await getUserId();

  const { data: defaultRoomIdData, error: defaultRoomIdError } = await supabase
    .from("profiles")
    .select("default_room")
    .eq("id", userId)
    .single();

  if (defaultRoomIdError) {
    console.error("DefaultRoomIdの取得に失敗しました");
    throw defaultRoomIdError;
  }

  if (!defaultRoomIdData.default_room) {
    console.log("DefaultRoomIdが未登録でした");
    return defaultRoomIdData.default_room;
  } else {
    return defaultRoomIdData.default_room;
  }
};
