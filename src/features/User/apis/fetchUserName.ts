import { supabase } from "../../../libs/supabase";

export const fetchUserName = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_name")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error, "UserNameのフェッチに失敗しました");
    throw error;
  }

  if (!data) {
    console.log("userIdに合致するdataが見つかりませんでした。");
  }

  return data;
};
