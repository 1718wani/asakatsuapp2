import { supabase } from "../../../libs/supabase";

export const getDefaultRoomForRoomsListDisplay = async (roomId: number) => {
  if (roomId < 0) return null;
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
  *,
  rules (
    penalty_threshold,
    wakeup_time
  ),
  room_members (
    failure_count,
    profiles (
      user_name,
      avatar_url
    )
  )
`
    )
    .eq("id", roomId)
    .single();

  if (error) {
    console.error(error);
    throw error;
  } else {
    console.log("Retrieved default room data:", data);
  }

  return data;
};
