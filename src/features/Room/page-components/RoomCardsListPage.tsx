import { ScrollView, View } from "react-native";

import { MakeRoomButton } from "../components/MakeRoomButton";
import Toast from "react-native-toast-message";
import { AllMyRoomsComponent } from "../components/cardsComponent/RoomsListComponent";

export const RoomCardsListPageComponent = () => {
  return (
    <View className="flex-1 pt-4">
      <ScrollView>
        <View className="flex-1">
          <AllMyRoomsComponent />
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
