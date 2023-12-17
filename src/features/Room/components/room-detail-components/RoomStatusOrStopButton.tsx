import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

export const RoomStatusOrStopButton = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const handlePress = () => {
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-red-300 rounded-3xl shadow-slate-900 shadow-xl p-2 items-center"
    >
      <Text className=" text-white text-2xl font-bold">おきました</Text>
      <Toast
        visible={toastVisible}
        position={Toast.positions.TOP}
        shadow={true}
        animation={true}
        hideOnPress={true}
        
      >
        起床が記録されました！
      </Toast>
    </TouchableOpacity>
  );
};
