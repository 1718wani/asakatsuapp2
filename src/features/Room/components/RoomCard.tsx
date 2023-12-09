import { Image, ScrollView, Text, View } from "react-native";

export const RoomCard = () => {
  return (
    <View className="py-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-xs mx-auto">
      <View className="rounded-lg border border-slate-100 bg-white text-black shadow-sm ">
        <View className="flex flex-col space-y-1.5 px-6 pt-6">
          <View className="flex flex-row justify-between items-center">
            <Text className="font-semibold tracking-tight text-gray-700 text-lg">
              朝活部屋
            </Text>
            <View className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors  border-transparent  text-gray-700 bg-gray-300">
              <Text>Badge</Text>
            </View>
          </View>
          <Text className="text-gray-500 text-sm">次起きる時間:12:00 PM</Text>
          <View className="flex space-x-2">
            <Text className="text-gray-500 text-sm">ペナルティ</Text>
            <View className="flex items-center justify-between mb-4 space-x-1">
              <View className="w-1/4 h-4 bg-red-600 rounded-xl" />
              <View className="w-1/4 h-4 bg-red-600 rounded-xl " />
              <View className="w-1/4 h-4 bg-red-100 rounded-xl " />
              <View className="w-1/4 h-4 bg-red-100 rounded-xl" />
            </View>
          </View>
        </View>
        <View className="p-6 text-gray-600">
          <View className="mb-2">
            <Text className="text-gray-700 text-base mb-1">Members:</Text>
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
  );
};
