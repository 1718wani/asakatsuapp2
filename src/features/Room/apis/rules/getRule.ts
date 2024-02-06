import { supabase } from "../../../../libs/supabase";

export const getRule = async (roomId: number) => {
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
        rule,
        rules (
          *
        )
      `
    )
    .eq("id", roomId)
    .single();

  if (error) {
    console.error("Ruleの取得を失敗しました", error);
    throw error;
  }

  return data;
};
