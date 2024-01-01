import { err } from "react-native-svg/lib/typescript/xml";
import { supabase } from "../../../libs/supabase";
import { getUserIdsFromUserCodes } from "./getUserIdsFromUserCodes";
import { getUserId } from "../../User/apis/getUserId";

export const createInvitations = async (
  roomId: number,
  participantCodes: string[]
) => {
  // ユーザーコードからユーザーIDを取得
  const myId = await getUserId();
  const participantIds = await getUserIdsFromUserCodes(participantCodes);

  // 招待状の配列を作成
  const invitations = participantIds.map((participantId) => ({
    user_id: participantId,
    room_id: roomId,
    created_by: myId,
    // `approved` と `created_at` はデフォルト値を使用
  }));

  const { data, error } = await supabase
    .from("invitation")
    .insert(invitations)
    .select();

  if (error) {
    console.error("Error in creating invitations:", error);
    throw error;
  }

  console.log("Created invitations:", data);
};
