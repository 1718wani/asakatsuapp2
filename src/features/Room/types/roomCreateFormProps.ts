import { dayOfWeekType } from "./dayOfWeekType";

export type roomCreateFormProps = {
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
