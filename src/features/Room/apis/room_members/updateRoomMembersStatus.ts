import { supabase } from "../../../../libs/supabase";
import { Database } from "../../../../types/supabaseSchema";

export const updateRoomMembersStatus = async (
  roomId: number,
  userIds: string[],
  status: Database["public"]["Enums"]["room_member_status"]
) => {
  try {
    const updates = userIds.map(async (userId) => {
      const { error } = await supabase
        .from("room_members")
        .update({ status })
        .eq("room_id", roomId)
        .eq("user_id", userId);

      if (error) {
        console.error(
          "あるuserIdに紐づくStatusの更新でエラーが発生しました",
          error
        );
        throw error;
      }
    });

    const results = await Promise.all(updates);
    return results;
  } catch (error) {
    console.error("Error updating room members status:", error);
    throw error;
  }
};
