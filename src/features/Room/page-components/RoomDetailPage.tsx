import { ScrollView, Text, View } from "react-native";
import { DisplayedClock } from "../components/room-detail-components/DisplayedClock";
import { RoomStatusOrStopButton } from "../components/room-detail-components/RoomStatusOrStopButton";
import { AwakeHeatMap } from "../components/room-detail-components/AwakeHeatMap";
import { DisplayedSuccessNumber } from "../components/room-detail-components/DisplayedSuccessNumber";
import { ParticipantPerformanceCard } from "../components/room-detail-components/ParticipantPerformanceCard";
import { RoomRuleDetailCard } from "../components/room-detail-components/RoomRuleDetailCard";
import { UserPerformanceCard } from "../components/room-detail-components/UserPerformanceCard";
import { getDefaultRoomInfo } from "../apis/getDefaultRoomInfo";
import { DefaultRoomInvitationUserCards } from "../components/room-detail-components/DefaultRoomInvitationUserCards";
import { getUserInfo } from "../apis/getUserInfo";
import { WaitingDisplay } from "../components/WaitingDisplay";
import { StartRoomButton } from "../components/room-detail-components/buttons/StartRoomButton";
import { useQuery } from "@tanstack/react-query";

export const RoomDetailPageComponent = () => {
  const {
    data: defaultRoomInfo,
    isLoading: defaultRoomInfoLoading,
    error: defaultRoomInfoError,
  } = useQuery({
    queryKey: ["defaultRoomInfo"],
    queryFn: () => getDefaultRoomInfo(),
  });

  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });

  return (
    <>
      <View className=" fixed w-10/12 mx-auto my-2  ">
        {defaultRoomInfo?.status === "ongoing" && <DisplayedClock />}
        {defaultRoomInfo?.status === "inviting" &&
          userInfo?.id === defaultRoomInfo.host_user && <StartRoomButton />}
        {defaultRoomInfo?.status === "inviting" &&
          userInfo?.id !== defaultRoomInfo.host_user && <WaitingDisplay />}
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
              {defaultRoomInfoLoading && <Text>Loading</Text>}
              {defaultRoomInfoError && <Text>Error</Text>}
              {defaultRoomInfo && (
                <UserPerformanceCard
                  totalSuccessCount={
                    defaultRoomInfo?.room_members[0]?.total_success_count ?? 0
                  }
                  totalFailureCount={
                    defaultRoomInfo?.room_members[0]?.total_failure_count ?? 0
                  }
                  penaltyCount={
                    defaultRoomInfo?.room_members[0]?.penalty_count ?? 0
                  }
                  failureCount={
                    defaultRoomInfo?.room_members[0]?.failure_count ?? 0
                  }
                  skipCount={defaultRoomInfo?.room_members[0]?.skip_count ?? 0}
                  penaltyThreshold={
                    defaultRoomInfo?.rules?.penalty_threshold ?? 0
                  }
                  skipLimit={defaultRoomInfo?.rules?.skip_limit ?? 0}
                  status={defaultRoomInfo.room_members[0].status}
                />
              )}
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

          {defaultRoomInfoLoading && <Text>Loading</Text>}
          {defaultRoomInfoError && <Text>Error</Text>}
          {defaultRoomInfo?.room_members && (
            <View className="flex flex-row gap-x-3">
              {defaultRoomInfo.room_members.slice(1).map((member) => (
                <View key={member.user_id} className="basis-1/4">
                  {member.status === "active" ? (
                    // アクティブなメンバー用のコンポーネント
                    <ParticipantPerformanceCard
                      totalSuccessCount={member.total_success_count}
                      totalFailureCount={member.total_failure_count}
                      penaltyCount={member.penalty_count}
                      failureCount={member.failure_count}
                      skipCount={member.skip_count}
                      penaltyThreshold={
                        defaultRoomInfo.rules?.penalty_threshold ?? 5
                      }
                      skipLimit={defaultRoomInfo.rules?.skip_limit ?? 5}
                      userName={member.profiles?.user_name ?? ""}
                      avatarUrl={member.profiles?.avatar_url}
                      status={member.status}
                    />
                  ) : (
                    // 非アクティブなメンバー用のコンポーネント
                    <DefaultRoomInvitationUserCards
                      avatarUrl={member.profiles?.avatar_url}
                      userName={member.profiles?.user_name ?? ""}
                      status={member.status}
                    />
                  )}
                </View>
              ))}
            </View>
          )}

          <View className="flex flex-row justify-start">
            <View className="basis-10/12">
              <Text className="text-lg font-bold">ルームとルールの詳細</Text>
            </View>
          </View>
          <View className="flex flex-row">
            <View className=" basis-10/12">
              {defaultRoomInfoLoading && <Text>Loading</Text>}
              {defaultRoomInfoError && <Text>Error</Text>}
              {defaultRoomInfo && (
                <RoomRuleDetailCard
                  purpose={defaultRoomInfo?.purpose ?? ""}
                  penaltyDetail={defaultRoomInfo?.rules?.penalty_detail ?? ""}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
