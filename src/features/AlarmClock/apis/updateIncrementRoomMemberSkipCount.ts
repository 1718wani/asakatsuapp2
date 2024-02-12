import { supabase } from "../../../libs/supabase";
import { getDefaultRoomId } from "../../Room/apis/getDefaultRoomId";
import { getUserId } from "../../User/apis/getUserId";

export const updateIncrementRoomMemberSkipCount = async (): Promise<void> => {
  const userId = await getUserId();
  const roomId = await getDefaultRoomId();
  if (!userId || !roomId) {
    throw new Error();
  }
  try {
    // まず該当するレコードを取得
    const { data: existingRecords, error: selectError } = await supabase
      .from("room_members")
      .select("skip_count")
      .eq("user_id", userId)
      .eq("room_id", roomId)
      .single();

    if (selectError) throw selectError;

    // skip_count を1減少させる
    const newSkipCount = existingRecords.skip_count + 1;

    // レコードを更新
    const { error: updateError } = await supabase
      .from("room_members")
      .update({ skip_count: newSkipCount })
      .eq("user_id", userId)
      .eq("room_id", roomId);

    if (updateError) throw updateError;

    console.log("Skip count successfully updated.");
  } catch (error) {
    console.error("Error updating skip count:", error);
  }
};
