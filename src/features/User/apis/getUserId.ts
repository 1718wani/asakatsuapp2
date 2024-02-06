import { router } from "expo-router";
import { supabase } from "../../../libs/supabase";

export const getUserId = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("sessionの取得に失敗しました");
    throw error;
  }
  const userId = data.session?.user.id;
  if (userId) {
    return userId;
  } else {
    console.error("ユーザーIDが見つかりません");
    throw new Error("ユーザーIDが見つかりません。");
  }
};
