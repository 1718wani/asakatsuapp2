import { ScrollView, Text, View } from "react-native";
import { DisplayedClock } from "../components/room-detail-components/DisplayedClock";
import { RoomStatusOrStopButton } from "../components/room-detail-components/RoomStatusOrStopButton";
import { AwakeHeatMap } from "../components/room-detail-components/AwakeHeatMap";
import { DisplayedSuccessNumber } from "../components/room-detail-components/DisplayedSuccessNumber";
import { ParticipantPerformanceCard } from "../components/room-detail-components/ParticipantPerformanceCard";
import { RoomRuleDetailCard } from "../components/room-detail-components/RoomRuleDetailCard";
import { UserPerformanceCard } from "../components/room-detail-components/UserPerformanceCard";
import useSWR from "swr";
import { getDefaultRoomForRoomsListDisplay } from "../apis/getDefaultRoomForRoomsListDisplay";
import { useAtomValue } from "jotai";
import { defaultRoomIdAtom } from "../../../states/defaultRoomAtom";

export const RoomDetailPageComponent = () => {
  const defaultRoomId = useAtomValue(defaultRoomIdAtom);
  const {
    data: defaultRoom,
    isLoading: defaultRoomIsLoading,
    error: defaultRoomError,
  } = useSWR(["defaultRoom"], () =>
    getDefaultRoomForRoomsListDisplay(
      // defaultRoomがない場合、負の数を返してNullを返す
      defaultRoomId
    )
  );
  return (
    <>
      <View className=" fixed w-10/12 mx-auto my-2  ">
        <DisplayedClock />
      </View>

      <ScrollView>
        <View className="flex flex-col items-center gap-y-3  mb-10">
          <View className="flex flex-row justify-start">
            <View className="basis-10/12">
              <Text className="text-lg font-bold">成績</Text>
            </View>
          </View>
          <View className="flex flex-row">
            <View className=" basis-10/12">
              <UserPerformanceCard
                totalSuccessCount={
                  defaultRoom?.room_members[0].total_success_count ?? 0
                }
                totalFailureCount={
                  defaultRoom?.room_members[0].total_failure_count ?? 0
                }
                penaltyCount={defaultRoom?.room_members[0].penalty_count ?? 0}
                failureCount={defaultRoom?.room_members[0].failure_count ?? 0}
                skipCount={defaultRoom?.room_members[0].skip_count ?? 0}
                penaltyThreshold={defaultRoom?.rules?.penalty_threshold ?? 0}
                skipLimit={defaultRoom?.rules?.skip_limit ?? 0}
              />
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
              <Text className="text-lg font-bold">ルームとルールの詳細</Text>
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
