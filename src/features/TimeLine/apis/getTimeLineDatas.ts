import { supabase } from "../../../libs/supabase";

export const getUserActivityLogsWithProfiles = async () => {
  const { data, error } = await supabase
    .from("user_activity_logs")
    .select(
      `
      *,
      profiles!inner(*)
    `
    )
    .order("timestamp", { ascending: false }); // 時系列順にソート

  if (error) {
    console.error("Error fetching user activity logs with profiles", error);
    return { error };
  }

  return { data };
};
