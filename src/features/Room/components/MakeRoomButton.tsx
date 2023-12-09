import { TouchableOpacity, Text } from "react-native";

export const MakeRoomButton = () => {
  return (
    <TouchableOpacity className="bg-red-300 rounded-full shadow-lg p-6 m-4">
      <Text className="h-5 items-center text-white font-bold">
        新規ルーム作成
      </Text>
    </TouchableOpacity>
  );
};
