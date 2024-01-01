import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getAllMyInvitations = async () => {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("invitation")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error("getAllMyInvitationsにてエラー");
  }

  return data;
};
