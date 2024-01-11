import { supabase } from "../../../libs/supabase";
import { getDefaultRoomId } from "./getDefaultRoomId";

export const getDefaultRoomName = async () => {
  const defaultRoomId = await getDefaultRoomId();
  if (!defaultRoomId) return null;
  const { data, error } = await supabase
    .from("rooms")
    .select("name,id")
    .eq("id", defaultRoomId)
    .single();

  if (error) {
    console.error("デフォルトルームの名前の取得に失敗");
    throw error;
  }

  return data;
};
