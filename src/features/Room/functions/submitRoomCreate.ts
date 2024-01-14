import { router } from "expo-router";
import { createRoom } from "../apis/createRoom";
import { createRule } from "../apis/createRule";
import { roomCreateFormProps } from "../types/roomCreateFormProps";
import Toast from "react-native-toast-message";
import { createInvitations } from "../apis/createInvitations";

export const submitRoomCreate = async (data: roomCreateFormProps) => {
  try {
    // まずルールを作成
    const ruleId = await createRule(
      data.penaltyDescription,
      data.penaltyCountThreshold,
      data.awakeTime,
      data.selectedDaysOfWeek,
      data.selectedWeeklyOrMonthly,
      data.selectedPassLimitNumber
    );

    const room = await createRoom(data.roomName, data.roomDescription, ruleId);
    await createInvitations(room.id, data.invitedMembers);
    router.back();
    Toast.show({
      type: "success",
      text1: "ルーム作成に成功しました",
    });
  } catch (error) {
    console.error("エラー発生:", error);
    Toast.show({
      type: "error",
      text1: "ルーム作成に失敗しました",
    });
  }
};
