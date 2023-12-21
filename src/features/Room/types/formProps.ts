import { dayOfWeekType } from "./dayOfWeekType";

export type formProps = {
    roomName: string;
    roomDescription: string;
    penaltyDescription: string;
    penaltyCountThreshold: number;
    awakeTime: Date;
    selectedDaysOfWeek: dayOfWeekType[];
    selectedWeeklyOrMonthly: "weekly" | "monthly";
    selectedPassLimitNumber: number;
    invitedMembers: string[];
  };