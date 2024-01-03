import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getAllMyInvitationsForRoomsListDisplay = async () => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("invitation")
    .select(
      `
    id,
    approved,
    room_id,
    rooms (
      id,
      name, 
      rules (
        penalty_threshold,
        wakeup_time
      ),
      room_members (
        profiles (
          user_name,
          avatar_url
        )
      )
    )
  `
    )
    .eq("user_id", userId)
    .eq("approved", false);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Retrieved invitation data:", data);
  }

  return data;
};
