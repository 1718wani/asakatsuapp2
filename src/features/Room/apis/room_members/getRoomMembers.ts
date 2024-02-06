import { supabase } from "../../../../libs/supabase";
import { Database } from "../../../../types/supabaseSchema";

export const getRoomMembers = async (
  roomId: number,
  status?: Database["public"]["Enums"]["room_member_status"]
) => {
  let query = supabase.from("room_members").select("*").eq("room_id", roomId);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching room members:", error);
    return null;
  }

  return data;
};
