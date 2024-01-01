import { supabase } from "../../../libs/supabase";

export const updateProfile = async (userName: string, avatarUrl: string) => {
  const userId = (await supabase.auth.getSession()).data.session?.user.id;
  if (userId === undefined) throw new Error();
  const { data, error } = await supabase
    .from("profiles")
    .update({ user_name: userName, avatar_url: avatarUrl })
    .eq("id", userId);

  if (error) throw error;
  return data;
};
