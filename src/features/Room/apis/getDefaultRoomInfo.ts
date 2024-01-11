import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";
import { getDefaultRoomId } from "./getDefaultRoomId";

export const getDefaultRoomInfo = async () => {
  const defaultRoomId = await getDefaultRoomId();
  const userId = await getUserId();
  // デフォルトルームIDがない場合はnullを返す。
  if (!defaultRoomId) return null;
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
  id,
  name,
  purpose,
  host_user,    
  status, 
  rules (
    penalty_threshold,
    penalty_detail,
    skip_limit,
    wakeup_time
  ),
  room_members (
    *,
    profiles (
      id,
      user_name,
      avatar_url
    )
  )`
    )
    .eq("id", defaultRoomId)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }



  // room_membersでuserIdと一致するメンバーを先頭に移動
  // これにより、自分自身のデータは0番目、それ以外は1番目以降から取得すればよい。
  if (data && data.room_members) {
    const userIndex = data.room_members.findIndex(
      (member) => member.user_id === userId
    );
    if (userIndex > -1) {
      const [userMember] = data.room_members.splice(userIndex, 1);
      data.room_members.unshift(userMember);
    }
  }


  return data;
};
