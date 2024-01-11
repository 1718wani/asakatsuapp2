import { Text, TouchableOpacity, View } from "react-native";
import { Database } from "../../../types/supabaseSchema";
import { router } from "expo-router";
import { updateDefaultRoomId } from "../apis/updateDefaultRoomId";
import { updateRoomMemberStatus } from "../apis/updateRoomMemberStatus";
import { mutate } from "swr";
import { path } from "../../../consts/path";

type ruleProps = {
  roomId: number;
  rules: Database["public"]["Tables"]["rules"]["Row"];
};

export const RuleDetailForFirstApproval = (props: ruleProps) => {

  const handleApprovalButton = async () => {
    console.log(props.roomId,"roomidだよ")
    await updateDefaultRoomId(props.roomId);
    await updateRoomMemberStatus(props.roomId, "active");
    // タイトルを現状のデフォルトルームの名前に変える。
    await mutate(["defaultRoomName"]);
    // ルーム情報を更新する。
    await mutate(["defaultRoomInfo"]);
    router.push(path.dashboard);
  };
  return (
    <>
      <View className=" bg-white w-11/12  h-5/6 my-auto mx-auto rounded-2xl shadow-black shadow-lg ">
        <View className="mx-8 my-auto ">
          <Text className=" text-lg font-medium">起床時間</Text>
          <Text className=" mt-1 mb-3 text-base">
            {props.rules.wakeup_time}
          </Text>
          <Text className=" text-lg font-medium">開催曜日</Text>
          <Text className=" mt-1 mb-3 text-base">
            {props.rules.active_days}
          </Text>
          <Text className=" text-lg font-medium">ペナルティの内容</Text>
          <Text className=" mt-1 mb-3 text-base">
            {props.rules.penalty_detail}
          </Text>
          <Text className=" text-lg font-medium">ペナルティルール</Text>
          <Text className=" mt-1 mb-3 text-base">
            {props.rules.penalty_threshold}回失敗で1ペナルティ
          </Text>
          <Text className=" text-lg font-medium">スキップルール</Text>
          <Text className=" mt-1 mb-3 text-base">
            {props.rules.skip_period}に{props.rules.skip_limit}回スキップ可能
          </Text>
          <View className=" flex flex-row gap-2 mt-4 ">
            <TouchableOpacity
              onPress={() => router.back()}
              className=" bg-gray-500 rounded-lg p-2 "
            >
              <Text className=" text-white">戻る</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApprovalButton}
              className=" bg-teal-500 rounded-lg p-2"
            >
              <Text className=" text-white">参加する</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
