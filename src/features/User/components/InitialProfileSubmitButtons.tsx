import { Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../../libs/supabase";
import { signOut } from "../functions/signOut";

type submitButtonProps = {
  onSubmit: () => void;
};

export const InitialProfileSubmitButtons = ({
  onSubmit,
}: submitButtonProps) => {
  return (
    <View className=" flex flex-row gap-2">
      <TouchableOpacity
        onPress={onSubmit}
        className="rounded-lg text-sm px-2 py-2.5 text-center bg-teal-600  w-1/3"
      >
        <Text className="text-white font-medium text-center">送信する</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signOut}
        className="rounded-lg text-sm px-2 py-2.5 text-center bg-gray-400  w-1/3"
      >
        <Text className="text-white font-medium text-center">ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};
