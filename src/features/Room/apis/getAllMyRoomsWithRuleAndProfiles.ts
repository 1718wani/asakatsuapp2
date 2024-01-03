import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getAllMyRoomsWithRuleAndProfiles = async () => {
  const userId = await getUserId();
  const { data, error } = await supabase
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
        profiles (
          user_name,
          avatar_url
        )
      )
    )
  `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Retrieved all my rooms data:", data);
  }

  return data
};
