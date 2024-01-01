import { supabase } from "../../../libs/supabase";

export const fetchUserName = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_name")
    .eq("id", userId);

  if (error) {
    throw new Error("fetchUserNameのエラー")
  }

  return data.length > 0 ? data[0].user_name : null;
};
