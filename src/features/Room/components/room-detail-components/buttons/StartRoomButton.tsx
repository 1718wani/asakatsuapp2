import { Text, TouchableOpacity, View } from "react-native";
import { updateRoomStatus } from "../../../apis/updateRoomStatus";
import { getDefaultRoomId } from "../../../apis/getDefaultRoomId";
import { sendPushNotifications } from "../../../../AlarmClock/functions/sendPushNotifications";
import { updateRoomMembersStatus } from "../../../apis/room_members/updateRoomMembersStatus";
import { getRoomMembers } from "../../../apis/room_members/getRoomMembers";
import { getPushTokens } from "../../../../AlarmClock/apis/getPushTokens";

export const StartRoomButton = () => {
  const handleRoomStartButton = async () => {
    // ルームステータスをongoingに変更する
    await updateRoomStatus("ongoing");
    // room_membersのうち、inactiveになっているものだけをactiveにする（つまり招待中は除外している。）
    const roomId = await getDefaultRoomId();
    console.log(roomId, "roomId");
    if (!roomId) return;
    const inactiveRoomMembers = await getRoomMembers(roomId, "inactive");
    console.log(inactiveRoomMembers, "inactiveRoomMembers");

    let userIds: string[] = [];
    if (inactiveRoomMembers) {
      userIds = inactiveRoomMembers.map((member) => member.user_id);
    }
    console.log(userIds, "userIds");
    await updateRoomMembersStatus(roomId, userIds, "active");

    // activeなメンバーに通知を届ける。
    const pushTokens = await getPushTokens(userIds);
    console.log(pushTokens, "pushTokens");
    await sendPushNotifications(
      pushTokens?.map((token) => token.expo_push_token),
      "朝活がスタートしました！",
      "実施日にはアプリを訪れて起きたよボタンを押してください！"
    );
  };

  return (
    <TouchableOpacity onPress={handleRoomStartButton}>
      <View className=" p-2 bg-white rounded-md shadow-sm items-center  ">
        <Text className=" text-gray-900 font-semibold text-2xl">開始する</Text>
      </View>
    </TouchableOpacity>
  );
};
