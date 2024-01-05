import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getDefaultRoomForRoomsListDisplay = async (
  roomId: number | null
) => {
  const userId = await getUserId();
  if (!roomId) return null;
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
  name,    
  purpose,
  status, 
  rules (
    penalty_threshold,
    skip_limit,
    wakeup_time
  ),
  room_members (
    *,
    profiles (
      id,
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

  // userIdと合致するroom_membersを並び替える
  if (data && data.room_members) {
    const currentUserMemberIndex = data.room_members.findIndex(
      (member) => member.profiles?.id === userId
    );
    if (currentUserMemberIndex > -1) {
      const currentUserMember = data.room_members.splice(
        currentUserMemberIndex,
        1
      )[0];
      data.room_members.unshift(currentUserMember);
    }
  }

  return data;
};
