import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

// カスタムフックの定義
export const useWiggleAnimation = (
  config = { damping: 1200, stiffness: 10000 }
) => {
  const rotation = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(withSpring(5, config), -1, true);
    const timeoutId = setTimeout(() => {
      rotation.value = withRepeat(withSpring(-5, config), -1, true);
    }, 10);

    return () => clearTimeout(timeoutId); // クリーンアップ関数でタイマーをクリア
  }, []);

  return animatedIconStyle;
};
