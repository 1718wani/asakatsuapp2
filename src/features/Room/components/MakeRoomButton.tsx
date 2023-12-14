import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

import { path } from "../../../consts/path";

export const MakeRoomButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(path.createRoom);
      }}
      className="bg-red-300 rounded-full shadow-lg p-6 m-4"
    >
      <Text className="h-5 items-center text-white font-bold">
        新規ルーム作成
      </Text>
    </TouchableOpacity>
  );
};
