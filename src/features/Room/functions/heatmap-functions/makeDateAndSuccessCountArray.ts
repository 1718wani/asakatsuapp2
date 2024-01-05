import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";
import { Database } from "../../../../types/supabaseSchema";
import { dateData } from "../../types/dateAndAwakeCountPairArray";


type activityDataProps = {
  room_id: number;
  timestamp: string;
  user_activity_type: Database["public"]["Enums"]["user_activity_type_enum"];
  user_id: string;
};

// 今日の日付に基づいて、date,awakeSuccessCount:undefinedのフィールドを持つオブジェクト配列を作成する関数
const generateDateRangeData = (): dateData[] => {
  const today = new Date();
  const start = startOfMonth(addMonths(today, -1)); // 先月の1日
  const end = endOfMonth(today); // 来月の末日

  const dateRange = eachDayOfInterval({ start, end });

  return dateRange.map((date) => ({
    date: format(date, "yyyy/MM/dd"),
    awakeSuccessCount: undefined,
  }));
};

// swrで手に入れたデータをもとに作る。
const countAwakeSuccess = (
  data: activityDataProps[] | null | undefined
): dateData[] => {
  const countMap = new Map();
  if (data === null || data === undefined) return [];

  data.forEach((item) => {
    if (item.user_activity_type === "wake_up_success") {
      const date = new Date(item.timestamp)
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "/");
      countMap.set(date, (countMap.get(date) || 0) + 1);
    }
  });

  return Array.from(countMap).map(([date, count]) => ({
    date,
    awakeSuccessCount: count,
  }));
};

// dateRangeData と countAwakeSuccess をもとにして作る。

const updateAwakeSuccessCount = (
  originalData: dateData[],
  updateData: dateData[]
) => {
  const updateMap = new Map(
    updateData.map((item) => [item.date, item.awakeSuccessCount])
  );

  return originalData.map((item) => {
    if (updateMap.has(item.date)) {
      return { ...item, awakeSuccessCount: updateMap.get(item.date) };
    }
    return item;
  });
};

export const makeDateAndSuccessCountArray = (
  fetchedData: activityDataProps[] | null | undefined
) => {
  // 現在の日付をもとにundefinedを格納したペアを日付分作る。
  const originalData = generateDateRangeData();
  const updateData = countAwakeSuccess(fetchedData);
  const resultData = updateAwakeSuccessCount(originalData, updateData);
  return resultData;
};
