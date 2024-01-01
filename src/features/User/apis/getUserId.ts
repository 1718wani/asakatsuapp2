import { router } from "expo-router";
import { supabase } from "../../../libs/supabase";

export const getUserId = async (): Promise<string> => {
  const session = await supabase.auth.getSession();
  const userId = session.data.session?.user.id;
  if (userId !== undefined) {
    return userId;
  } else {
    // ここでエラーメッセージを返すか、エラーを投げる
    throw new Error("ユーザーIDが見つかりません。");
  }
};
