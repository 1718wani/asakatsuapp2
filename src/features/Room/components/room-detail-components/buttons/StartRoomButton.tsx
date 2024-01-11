import { Text, TouchableOpacity, View } from "react-native";
import { updateRoomStatus } from "../../../apis/updateRoomStatus";

export const StartRoomButton = () => {
  const handleRoomStartButton = async () => {
    await updateRoomStatus("ongoing");
  };

  return (
    <TouchableOpacity onPress={handleRoomStartButton}>
      <View className=" p-2 bg-white rounded-md shadow-sm items-center  ">
        <Text className=" text-gray-900 font-semibold text-2xl">開始する</Text>
      </View>
    </TouchableOpacity>
  );
};
