import { supabase } from "../../../libs/supabase";

export const updateUserActivityLogChecked = async (logId: number) => {
  const { error } = await supabase
    .from("user_activity_logs")
    .update({ checked: true })
    .eq("id", logId);

  if (error) {
    console.error("Error updating user activity log with eq:", error);
    throw error;
  }
};
