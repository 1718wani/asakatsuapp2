import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { path } from "../../../consts/path";
import { DisplayedCardProps } from "../types/DisplayedCardProps";
import { useSetAtom } from "jotai";
import { defaultRoomIdAtom } from "../../../states/defaultRoomAtom";

export const RoomCard = (props: DisplayedCardProps) => {
  const setDefaultRoomId = useSetAtom(defaultRoomIdAtom);
  const renderPenaltyBars = (
    penaltyThreshold: number,
    failureCount: number | undefined
  ) => {
    const penaltyBars = [];
    for (let i = 0; i < penaltyThreshold; i++) {
      // failureCountがundefinedの場合は、すべてのバーをbg-red-100で表示
      const bgColor =
        failureCount === undefined
          ? "bg-red-100"
          : i < failureCount
            ? "bg-red-600"
            : "bg-red-100";
      penaltyBars.push(
        <View key={i} className={`w-7 h-4 ${bgColor} rounded-xl`} />
      );
    }
    return penaltyBars;
  };

  const cardClickHandler = (roomId: number) => {
    console.log(roomId, "cardClickをしたときに選択されたRoomId");
    setDefaultRoomId(roomId);
    router.push(path.dashboard);
  };


  return (
    <>
      <TouchableOpacity onPress={() => cardClickHandler(props.roomId)}>
        <View className="mt-2 p-3 bg-gray-100 rounded-lg shadow-lg w-full max-w-xs mx-auto">
          <View className="rounded-lg border border-slate-100 bg-white text-black  shadow-sm ">
            <View className="flex flex-col space-y-1.5 px-6 pt-6">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-semibold tracking-tight text-gray-700 text-lg">
                  {props.roomName}
                </Text>
                <View className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold  border-transparent  bg-emerald-500 shadow-sm">
                  <Text className=" text-white">{props.roomStatus}</Text>
                </View>
              </View>
              <Text className="text-gray-500 text-sm">{props.wakeUpTime}</Text>
              <View className="flex flex-row space-x-2 items-center">
                {props.participants[0].failure_count ? (
                  <Text className="text-gray-500 text-sm pr-2">
                    残り{props.participants[0].failure_count}機:
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-sm pr-2">
                    {props.penaltyThreshold}回でペナルティ
                  </Text>
                )}

                <View className="flex flex-row items-center justify-between space-x-1">
                  {renderPenaltyBars(
                    props.penaltyThreshold,
                    props.participants[0].failure_count
                  )}
                </View>
              </View>
            </View>
            <View className="p-6 text-gray-600">
              <View className="mb-2">
                <Text className="text-gray-700 text-base mb-1">メンバー:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {props.participants.map((participant, index) => (
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
