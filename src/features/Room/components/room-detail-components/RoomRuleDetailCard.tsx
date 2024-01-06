import { View, Text, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type detailProps = {
  purpose: string;
  penaltyDetail: string;
};

export const RoomRuleDetailCard = (props: detailProps) => {
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

      <Text className=" text-sm font-medium">{props.purpose}</Text>
      <Text className=" text-xl  font-bold mt-1">ペナルティの内容</Text>
      <Text className=" text-sm font-medium">{props.penaltyDetail}</Text>
    </View>
  );
};
