import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { RootSiblingParent } from "react-native-root-siblings";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

export const AwakeButton = () => {
  const rotation = useSharedValue(0);

  // アニメーションスタイルを定義
  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // コンポーネントがマウントされた時にアニメーションを開始
  useEffect(() => {
    const springConfig = {
      damping: 1200,
      stiffness: 10000,
    };

    rotation.value = withRepeat(withSpring(5, springConfig), -1, true);
    setTimeout(() => {
      rotation.value = withRepeat(withSpring(-5, springConfig), -1, true);
    }, 10);
  }, []);

  const handlePress = () => {
    Toast.show({
      type: "success",
      text1: `起床を記録しました`,
    });
  };
  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        className="bg-red-300  rounded-full w-16 h-16  shadow-lg p-2 items-center"
      >
        <Animated.View style={animatedIconStyle}>
          <Ionicons name="alarm-outline" size={24} color="white" />
        </Animated.View>
        <Text className=" text-white text-xs font-bold">おきたよ</Text>
      </TouchableOpacity>
    </>
  );
};
