import { format } from "date-fns";

import { supabase } from "../../../libs/supabase";
import { dayOfWeekType } from "../types/dayOfWeekType";
import { getUserId } from "../../User/apis/getUserId";

export const createRule = async (
  penaltyDescription: string,
  penaltyCountThreshold: number,
  awakeTime: Date,
  selectedDaysOfWeek: dayOfWeekType[],
  selectedWeeklyOrMonthly: "weekly" | "monthly",
  selectedPassLimitNumber: number
) => {
  const id = await getUserId();

  const { data: ruleData, error: ruleError } = await supabase
    .from("rules")
    .insert([
      {
        // その他のルーム情報
        createdBy: id,
        wakeup_time: format(awakeTime, "HH:mm"),
        skip_period: selectedWeeklyOrMonthly,
        skip_limit: selectedPassLimitNumber,
        penalty_detail: penaltyDescription,
        penalty_threshold: penaltyCountThreshold,
        active_days: selectedDaysOfWeek,
      },
    ])
    .select();

  if (ruleError) {
    throw ruleError;
  }

  console.log("ルーム作成成功:", ruleData);
  return ruleData[0].id;
};
