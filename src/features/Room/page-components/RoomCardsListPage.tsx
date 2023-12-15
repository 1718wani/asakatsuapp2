import { ScrollView, View } from "react-native";

import { MakeRoomButton } from "../components/MakeRoomButton";
import { RoomCard } from "../components/RoomCard";

export const RoomCardsListPageComponent = () => {
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
    </View>
  );
};
