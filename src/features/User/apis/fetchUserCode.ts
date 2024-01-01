import { router } from "expo-router";
import { supabase } from "../../../libs/supabase";
import { getUserId } from "./getUserId";
export const fetchUserCode = async () => {
  // テストのために2秒遅延
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const userId = await getUserId();

  const { data, error } = await supabase
    .from("profiles")
    .select("user_code")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error();
  }

  return data.user_code;
};
