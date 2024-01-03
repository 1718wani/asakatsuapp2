import { ScrollView, Text, View } from "react-native";

import { MakeRoomButton } from "../components/MakeRoomButton";
import { RoomCard } from "../components/RoomCard";
import Toast from "react-native-toast-message";
import { useAtomValue } from "jotai";
import { defaultRoomAtom } from "../../../states/defaultRoomAtom";
import { router } from "expo-router";
import { path } from "../../../consts/path";
import { getDefaultRoom } from "../apis/getDefaultRoom";
import useSWR from "swr";
import { getAllMyRoomsWithRuleAndProfiles } from "../apis/getAllMyRoomsWithRuleAndProfiles";
import { getAllMyInvitationsForRoomsListDisplay } from "../apis/getAllMyInvitationsForRoomsListDisplay";
import { getDefaultRoomForRoomsListDisplay } from "../apis/getDefaultRoomForRoomsListDisplay";

export const RoomCardsListPageComponent = () => {
  const defaultRoomFromAtom = useAtomValue(defaultRoomAtom);

  // defaultRoomidに合致するルームを取得する。
  const {
    data: defaultRoom,
    isLoading: defaultRoomIsLoading,
    error: defaultRoomError,
  } = useSWR(["defaultRoom"], () =>
    getDefaultRoomForRoomsListDisplay(
      defaultRoomFromAtom ? defaultRoomFromAtom.id : -1,
    )
  );

  console.log(defaultRoomFromAtom,"現在のデフォルトルーム")
  // 自分のIDをもとにRoommemberを取得して、RoommemberのRoomIDをもとにRoomを取得する。ただstatusがActiveは除く。
  const {
    data: allMyRooms,
    isLoading: allMyRoomsIsLoading,
    error: allMyRoomsError,
  } = useSWR(["allMyRooms"], () => getAllMyRoomsWithRuleAndProfiles());

  const {
    data: allMyInvitations,
    isLoading: allMyInvitationsIsLoading,
    error: allMyInvitationsError,
  } = useSWR(["allMyInvitations"], () =>
    getAllMyInvitationsForRoomsListDisplay()
  );

  // 自分のIDをもとにInvitationを取得して、そのルームIDをもってRoomを取得する。

  const participantNames = defaultRoom?.room_members
    .map((member) => member.profiles?.user_name)
    .filter((name): name is string => name !== null && name !== undefined);

  // 同様に、avatarUrlsも取得し、フィルタリング
  const avatarUrls = defaultRoom?.room_members
    .map((member) => member.profiles?.avatar_url) // 仮定のプロパティ名 'avatar_url'
    .filter((url): url is string => url !== null && url !== undefined);

  if (
    allMyInvitationsIsLoading ||
    allMyRoomsIsLoading ||
    defaultRoomIsLoading
  ) {
    return (
      <View>
        <Text>isLoading</Text>
      </View>
    );
  } else if (defaultRoomError || allMyRoomsError || allMyInvitationsError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  } else if (defaultRoom) {
    return (
      <View className="flex-1 pt-4">
        <ScrollView>
          <View className="flex-1">
            <RoomCard
              roomName={defaultRoom?.name}
              roomStatus={defaultRoom?.status}
              wakeUpTime={defaultRoom?.rules?.wakeup_time}
              penaltyThreshold={defaultRoom?.rules?.penalty_threshold ?? 5}
              failureCount={defaultRoom?.room_members[0].failure_count}
              participantsName={participantNames}
              avatarUrls={avatarUrls ?? []}
            />
          </View>
        </ScrollView>
        <View className="absolute bottom-10 w-full items-center">
          <View className="h-1/3">
            <MakeRoomButton />
          </View>
        </View>
        <Toast position="bottom" />
      </View>
    );
  }
};
