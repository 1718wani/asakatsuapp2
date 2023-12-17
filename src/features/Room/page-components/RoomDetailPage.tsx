import { ScrollView, Text, View } from "react-native";
import { DisplayedClock } from "../components/room-detail-components/DisplayedClock";
import { RoomStatusOrStopButton } from "../components/room-detail-components/RoomStatusOrStopButton";
import { AwakeHeatMap } from "../components/room-detail-components/AwakeHeatMap";
import { DisplayedSuccessNumber } from "../components/room-detail-components/DisplayedSuccessNumber";
import { ParticipantPerformanceCard } from "../components/room-detail-components/ParticipantPerformanceCard";
import { RoomRuleDetailCard } from "../components/room-detail-components/RoomRuleDetailCard";
import { UserPerformanceCard } from "../components/room-detail-components/UserPerformanceCard";

export const RoomDetailPageComponent = () => {
  return (
    <>
      <ScrollView>
        <View className="flex flex-col items-center gap-y-3 mt-1 mb-10">
          <View className="flex flex-row justify-start">
            <View className="basis-10/12">
              <Text className="text-lg font-bold">成績</Text>
            </View>
          </View>
          <View className="flex flex-row">
            <View className=" basis-10/12">
              <UserPerformanceCard />
            </View>
          </View>
          <View className="flex flex-row gap-x-2 ">
            <View className=" basis-2/5 ">
              <DisplayedClock />
            </View>

            <View className=" basis-2/5">
              <RoomStatusOrStopButton />
            </View>
          </View>
          <View className="flex flex-row justify-start">
            <View className="basis-10/12">
              <Text className="text-lg font-bold">ルームの成績</Text>
            </View>
          </View>
          <View className="flex flex-row ">
            <View className=" basis-10/12">
              <AwakeHeatMap />
            </View>
          </View>
          <View className="flex flex-row justify-start">
            <View className="basis-10/12">
              <Text className="text-lg font-bold">ユーザーごとの状況</Text>
            </View>
          </View>

          <View className="flex flex-row gap-x-3">
            <View className=" basis-1/4">
              <ParticipantPerformanceCard />
            </View>

            <View className=" basis-1/4">
              <ParticipantPerformanceCard />
            </View>
            <View className=" basis-1/4">
              <ParticipantPerformanceCard />
            </View>
          </View>
          <View className="flex flex-row justify-start">
            <View className="basis-10/12">
              <Text className="text-lg font-bold">タスク一覧</Text>
            </View>
          </View>
          <View className="flex flex-row">
            <View className=" basis-10/12">
              <RoomRuleDetailCard />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
