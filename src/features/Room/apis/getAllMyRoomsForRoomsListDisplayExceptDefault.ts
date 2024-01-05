import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getAllMyRoomsForRoomsListDisplayExceptDefault = async (
  roomId: number | null
) => {
  const userId = await getUserId();
  let query = supabase
    .from("room_members")
    .select(
      `
      room_id,
      rooms (
        *,
        rules (
          penalty_threshold,
          wakeup_time
        ),
        room_members (
          failure_count,
          profiles (
            id,
            user_name,
            avatar_url
          )
        )
      )
    `
    )
    .eq("user_id", userId);

  // Apply the neq filter only if roomId is not null
  if (roomId !== null) {
    query = query.neq("room_id", roomId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Retrieved all my rooms data:", data);
  }

  return data;
};
