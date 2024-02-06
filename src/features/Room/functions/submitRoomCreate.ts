import { router } from "expo-router";
import { createRoom } from "../apis/createRoom";
import { createRule } from "../apis/createRule";
import { roomCreateFormProps } from "../types/roomCreateFormProps";
import Toast from "react-native-toast-message";
import { createInvitations } from "../apis/createInvitations";
import useSWR, { mutate } from "swr";
import { cache } from "swr/_internal";

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

    const newRoom = await createRoom(
      data.roomName,
      data.roomDescription,
      ruleId,
    );
    await createInvitations(newRoom.id, data.invitedMembers);

    //TODO defaultRoomがある場合は最初の画面に戻る。そうじゃなければback
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
