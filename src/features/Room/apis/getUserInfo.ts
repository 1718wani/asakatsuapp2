import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getUserInfo = async () => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("profiles")
    .select("user_name,avatar_url,user_code")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("userの基本データ取得でエラーが出ました", error);
    throw error;
  }

  return data
};
