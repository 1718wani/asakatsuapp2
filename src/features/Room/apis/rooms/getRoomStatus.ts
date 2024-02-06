import { supabase } from "../../../../libs/supabase";

export const getRoomStatus = async (roomId: number) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("status")
    .eq("id", roomId)
    .single();

  if (error) {
    console.error("roomStatusを更新することに失敗しました", error);
    throw error;
  }
  return data?.status;
};
