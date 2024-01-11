import { supabase } from "../../../libs/supabase";
import { getDefaultRoomId } from "./getDefaultRoomId";

export const getAwakeSuccessCountForHeatMap = async (
  firstDate: string,
  lastDate: string
) => {
  const roomId = await getDefaultRoomId();
  if (!roomId) return null;
  const { data, error } = await supabase
    .from("user_activity_logs")
    .select()
    .eq("room_id", roomId)
    .gte("timestamp", new Date(firstDate).toISOString())
    .lte("timestamp", new Date(lastDate).toISOString());

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return data;
};
