import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { path } from "../../../consts/path";

export const RoomCard = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/");
      }}
    >
      <View className="mt-2 p-3 bg-gray-100 rounded-lg shadow-lg w-full max-w-xs mx-auto">
        <View className="rounded-lg border border-slate-100 bg-white text-black  shadow-sm ">
          <View className="flex flex-col space-y-1.5 px-6 pt-6">
            <View className="flex flex-row justify-between items-center">
              <Text className="font-semibold tracking-tight text-gray-700 text-lg">
                朝活部屋
              </Text>
              <View className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold  border-transparent  bg-emerald-500 shadow-sm">
                <Text className=" text-white">7週継続中</Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm">
              次起きる時間: 12/10 6:00 AM
            </Text>
            <View className="flex flex-row space-x-2 items-center">
              <Text className="text-gray-500 text-sm pr-2">残り3機:</Text>
              <View className="flex flex-row items-center justify-between  space-x-1">
                <View className=" w-7 h-4 bg-red-600 rounded-xl" />
                <View className=" w-7 h-4 bg-red-600 rounded-xl " />
                <View className=" w-7 h-4 bg-red-100 rounded-xl " />
                <View className=" w-7 h-4 bg-red-100 rounded-xl" />
                <View className=" w-7 h-4 bg-red-100 rounded-xl" />
              </View>
            </View>
          </View>
          <View className="p-6 text-gray-600">
            <View className="mb-2">
              <Text className="text-gray-700 text-base mb-1">メンバー:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="pr-2">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/300" }}
                    className="rounded-full w-12 h-12"
                  />
                </View>
                <View className="pr-2">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/300" }}
                    className="rounded-full w-12 h-12"
                  />
                </View>
                <View className="pr-2">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/300" }}
                    className="rounded-full w-12 h-12"
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
