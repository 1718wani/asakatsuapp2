import { Text, View } from "react-native";

export const WaitingDisplay = () => {
  return (
    <View className=" p-2 bg-white rounded-md shadow-sm items-center  ">
      <Text className=" text-gray-900 font-semibold text-2xl">開始待ち</Text>
    </View>
  );
};
