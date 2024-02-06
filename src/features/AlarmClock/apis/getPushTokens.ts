import { supabase } from "../../../libs/supabase";

export const getPushTokens = async (userIds: string[]) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .in("id", userIds);

  if (error) {
    console.error("Error fetching push tokens:", error);
    return null;
  }

  // nullまたはundefinedのexpo_push_tokenをフィルタリングし、tokenのみの配列を返す
  return data;
};
