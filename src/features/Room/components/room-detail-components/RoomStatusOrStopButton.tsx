import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { Ionicons } from '@expo/vector-icons'; 

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
      className="bg-red-300  rounded-full w-16 h-16  shadow-lg p-2 items-center"
    >
      <Ionicons name="alarm-outline" size={24} color="white" />
      <Text className=" text-white text-xs font-bold">おきたよ</Text>
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
