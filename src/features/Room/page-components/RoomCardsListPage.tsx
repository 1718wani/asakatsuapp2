import { ScrollView, View } from "react-native";

import { MakeRoomButton } from "../components/MakeRoomButton";
import { RoomCard } from "../components/RoomCard";
import Toast from "react-native-toast-message";
import { useAtomValue } from "jotai";
import { defaultRoomAtom } from "../../../states/defaultRoomAtom";
import { router } from "expo-router";
import { path } from "../../../consts/path";
import { getDefaultRoom } from "../apis/getDefaultRoom";
import useSWR from "swr";

export const RoomCardsListPageComponent = () => {
  // defaultRoomidに合致するルームを取得する。
  const { data: defaultRoom } = useSWR(["defaultRoom"], () => getDefaultRoom());

  // 自分のIDをもとにRoommemberを取得して、RoommemberのRoomIDをもとにRoomを取得する。ただstatusがActiveは除く。
  

  // 自分のIDをもとにInvitationを取得して、そのルームIDをもってRoomを取得する。

  return (
    <View className="flex-1 pt-4">
      <ScrollView>
        <View className="flex-1">
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
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
};
