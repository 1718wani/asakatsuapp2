import { supabase } from "../../../libs/supabase";

export const getAwakeSuccessCountForHeatMap = async (
  roomId: number | null,
  firstDate: string,
  lastDate: string
) => {
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
