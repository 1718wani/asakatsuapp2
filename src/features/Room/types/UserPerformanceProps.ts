import { Database } from "../../../types/supabaseSchema";

export type UserPerformanceProps = {
  totalSuccessCount: number;
  totalFailureCount: number;
  penaltyCount: number;
  failureCount: number;
  skipCount: number;
  penaltyThreshold: number;
  skipLimit: number;
  userName?: string;
  avatarUrl?: string;
  status: Database["public"]["Enums"]["room_member_status"];
};
