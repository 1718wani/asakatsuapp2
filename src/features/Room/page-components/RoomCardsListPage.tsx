import { ScrollView, Text, View } from "react-native";

import { MakeRoomButton } from "../components/MakeRoomButton";
import { RoomCard } from "../components/RoomCard";
import Toast from "react-native-toast-message";
import { useAtomValue } from "jotai";
import { defaultRoomIdAtom } from "../../../states/defaultRoomAtom";
import { router } from "expo-router";
import { path } from "../../../consts/path";
import useSWR from "swr";
import { getAllMyInvitationsForRoomsListDisplay } from "../apis/getAllMyInvitationsForRoomsListDisplay";
import { getDefaultRoomForRoomsListDisplay } from "../apis/getDefaultRoomForRoomsListDisplay";
import { DefaultCardComponent } from "../components/cardsComponent/DefaultCardComponent";
import { InvitationCardsComponent } from "../components/cardsComponent/InvitationCardsComponent";
import { AllCardsExceptComponent } from "../components/cardsComponent/AllCardsExceptComponent";

export const RoomCardsListPageComponent = () => {
  const defaultRoomId = useAtomValue(defaultRoomIdAtom);

  return (
    <View className="flex-1 pt-4">
      <ScrollView>
        <View className="flex-1">
          <DefaultCardComponent defaultRoomId={defaultRoomId} />
          <AllCardsExceptComponent defaultRoomId={defaultRoomId} />
          <InvitationCardsComponent />
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
