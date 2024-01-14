import { err } from "react-native-svg/lib/typescript/xml";
import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const createRoom = async (
  roomName: string,
  roomDescription: string,
  ruleId: number
) => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("rooms")
    .insert([
      {
        // その他のルーム情報
        name: roomName,
        purpose: roomDescription,
        host_user: userId,
        rule: ruleId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
