import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";

export const ParticipantPerformanceCard = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("ユーザー詳細が見れます");
      }}
    >
      <View className=" bg-white p-1 shadow-xl rounded-2xl">
        <View className="flex flex-row space-x-2  items-center">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-8 h-8  m-1"
          />
          <Text className="">85%</Text>
        </View>
        <View className=" p-2">
          <View className="flex flex-row space-x-2 items-center">
            <Text className="text-gray-500 text-sm">残り</Text>
            <View className="flex flex-row items-center justify-between  space-x-1">
              <View className=" w-1 h-1 bg-red-600 rounded-xl" />
              <View className=" w-1 h-1 bg-red-600 rounded-xl " />
              <View className=" w-1 h-1 bg-red-100 rounded-xl " />
              <View className=" w-1 h-1 bg-red-100 rounded-xl" />
              <View className=" w-1 h-1 bg-red-100 rounded-xl" />
            </View>
          </View>
          <View className="flex flex-row space-x-2 items-center">
            <Text className="text-gray-500 text-sm">パス</Text>
            <View className="flex flex-row items-center justify-between  space-x-1">
              <View className=" w-1 h-1 bg-teal-600 rounded-xl" />
              <View className=" w-1 h-1 bg-teal-600 rounded-xl " />
              <View className=" w-1 h-1 bg-teal-100 rounded-xl " />
              <View className=" w-1 h-1 bg-teal-100 rounded-xl" />
              <View className=" w-1 h-1 bg-teal-100 rounded-xl" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
