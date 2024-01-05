import { supabase } from "../../../libs/supabase";

export const getUserIdsFromUserCodes = async (userCodes: string[]) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .in("user_code", userCodes);

  if (error || !data || data.length === 0) {
    console.error("Error fetching user ids:", error);
    throw new Error("Error fetching user ids:");
  }

  return data.map((record) => record.id);
};
