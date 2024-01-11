import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getAllMyRoomsForRoomsListDisplay = async () => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("room_members")
    .select(
      `
    room_id,
    status,
    rooms (
      *,
      rules (*),
      room_members (
        profiles(*)
      )
    )
  `
    )
    .eq("user_id", userId)
    .order("status", { referencedTable: "rooms", ascending: false });

  if (error) {
    console.error(
      "自分が参加しているルーム一覧とその付随情報でエラーが出ました",
      error
    );
    throw error;
  }

  return data;
};
