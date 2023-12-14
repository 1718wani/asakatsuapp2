import { useRouter } from "expo-router";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

export const FormButtonsComponent = () => {
  const router = useRouter();
  return (
    <View className="flex flex-row">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        className=" bg-gray-200 rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
      >
        <Text className="font-mediue">戻る</Text>
      </TouchableOpacity>
      <TouchableOpacity className=" bg-teal-600 rounded-lg text-sm px-5 py-2.5 text-center ">
        <Text className="font-medium text-white">次へ</Text>
      </TouchableOpacity>
    </View>
  );
};
