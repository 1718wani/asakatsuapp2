import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { path } from "../../../consts/path";
import { DisplayedCardProps } from "../types/DisplayedCardProps";
import Toast from "react-native-toast-message";

export const RoomCard = (props: DisplayedCardProps) => {
  const cardClickHandler = async (roomId: number) => {
    try {
      router.push({
        pathname: path.firstApproveRoomRule + "/" + roomId.toString(),
      });
    } catch {
      // トースト通知の表示
      Toast.show({
        type: "error",
        text1: "データを取得できませんでした",
      });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={async () => cardClickHandler(props.roomId)}>
        <View className="mt-2 p-3 bg-gray-100 rounded-lg shadow-lg w-full max-w-xs mx-auto">
          <View className="rounded-lg border border-slate-100 bg-white text-black  shadow-sm ">
            <View className="flex flex-col space-y-1.5 px-6 pt-6">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-semibold tracking-tight text-gray-700 text-lg">
                  {props.roomName}
                </Text>
                <View className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold  border-transparent  bg-emerald-500 shadow-sm">
                  <Text className=" text-white">{props.myStatus}</Text>
                </View>
              </View>

              <View className="flex flex-row space-x-2 items-center">
                <Text className="text-gray-500 text-sm pr-2">
                  {props.purpose}
                </Text>
              </View>
            </View>
            <View className="p-6 text-gray-600">
              <View className="mb-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {props.participants.map((participant) => (
                    <View key={participant.profiles?.id} className="pr-2">
                      <Image
                        source={{ uri: participant.profiles?.avatar_url }}
                        className="rounded-full w-12 h-12"
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
