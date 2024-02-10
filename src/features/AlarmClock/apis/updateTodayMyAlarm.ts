import { supabase } from "../../../libs/supabase";
import { Database } from "../../../types/supabaseSchema";
import { getTodayMyAlarm } from "./getTodayMyAlarm"; // 既存の関数をインポート

export const updateTodayMyAlarm = async (
  status: Database["public"]["Enums"]["alarm_status_enum"]
) => {
  // 今日のアラームを取得
  const todayAlarms = await getTodayMyAlarm();

  if (!todayAlarms || todayAlarms.length === 0) {
    console.log("今日のアラームはありません。");
    return;
  }

  // 各アラームのステータスを更新
  const updatePromises = todayAlarms.map(async (alarm) => {
    const { error } = await supabase
      .from("alarms")
      .update({ status })
      .eq("id", alarm.id);

    if (error) {
      console.error("アラームの更新中にエラーが発生しました:", error);
    }
  });

  // すべての更新が完了するのを待つ
  await Promise.all(updatePromises);

  console.log("今日のアラームのステータスが更新されました。");
};
