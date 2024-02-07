import { isToday } from "date-fns";

import { supabase } from "../../../libs/supabase";
import { getUserId } from "../../User/apis/getUserId";

export const getTodayMyAlarm = async () => {
  const userId = await getUserId();
  const { data: alarms, error } = await supabase
    .from("alarms")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching alarms:", error);
    return null;
  }

  // 現在の日付とアラームの日付を比較し、今日のアラームのみをフィルタリングします。
  const todayAlarms = alarms?.filter((alarm) => {
    const alarmDate = alarm.alarm_time; // 'YYYY-MM-DD HH:mm:ss' 形式を想定
    const alarmDateTime = new Date(alarmDate);
    return isToday(alarmDateTime);
  });

  console.log("取り出したアラーム", todayAlarms);

  return todayAlarms;
};
