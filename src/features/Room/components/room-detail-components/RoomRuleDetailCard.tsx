import { Image, View, Text, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const RoomRuleDetailCard = () => {
  return (
    <View className=" bg-white rounded-md shadow-sm p-3">
      <View className=" flex flex-row items-center justify-between">
        <Text className=" text-xl font-bold mb-1">ルームの目的</Text>
        <Pressable>
          {({ pressed }) => (
            <View
              className=" flex flex-row items-center"
              style={{ opacity: pressed ? 0.5 : 1 }}
            >
              <FontAwesome name="hand-o-right" size={18} />
              <Text className="ml-2 text-sm font-medium">変更サジェスト</Text>
            </View>
          )}
        </Pressable>
      </View>

      <Text className=" text-sm font-medium">朝活を継続する。</Text>
      <Text className=" text-xl  font-bold mt-1">ペナルティの内容</Text>
      <Text className=" text-sm font-medium">
        5回遅刻したらPaypayにそれぞれ250円入金する。二人遅刻したらその分負担額も増える
      </Text>
    </View>
  );
};
