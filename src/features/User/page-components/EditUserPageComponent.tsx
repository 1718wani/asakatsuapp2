import { Button, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../libs/supabase";
import { signOut } from "../functions/signOut";

export const EditUserPageComponent = () => {
  const handleOnClick = async () => {
    signOut();
  };
  return (
    <View className="items-center">
      <TouchableOpacity
        onPress={handleOnClick}
        className="bg-teal-600 w-1/3 items-center rounded-md"
      >
        <Text className="font-medium text-white h-4">ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};
