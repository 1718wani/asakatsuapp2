import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";

export const getLastMonthFirstDateAndThisMonthLastDate = () => {
  const currentDate = new Date();
  // 前月の1日を取得
  const firstDateOfLastMonth = format(
    startOfMonth(subMonths(currentDate, 1)),
    "yyyy-MM-dd"
  );
  // 今月の最終日を取得
  const lastDateOfCurrentMonth = format(endOfMonth(currentDate), "yyyy-MM-dd");
  return { firstDateOfLastMonth, lastDateOfCurrentMonth };
};
