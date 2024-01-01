import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { path } from "../../../consts/path";

const datas = [
  {
    roomName: "朝活部屋", // rooms.roomName
    roomStatus: "standby", // 停止中, 活動中
    wakeUpTime: "06:30", // 参加待ちか停止中なら起きる時刻：HH:mm,  活動中なら日にちも含めて、次起きる時刻とする。
    penaltyInfo: 5, // 参加待ちなら‐回失敗でペナルティと表示をする。 停止中、活動中なら残り‐機
    member: [
      "https://i.pravatar.cc/300",
      "https://i.pravatar.cc/300",
      "https://i.pravatar.cc/300",
      "https://i.pravatar.cc/300",
    ],
  },
];

export const RoomCard = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(path.dashboard);
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
