import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { updateTodayMyAlarm } from "../apis/updateTodayMyAlarm";
import { Database } from "../../../types/supabaseSchema";

type props = {
  wakeUpModalVisible: boolean;
  setWakeUpModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WakeUpModal = ({
  wakeUpModalVisible,
  setWakeUpModalVisible,
}: props) => {
  const [isAlreadyWakeUpButtonPushed, setIsAlreadyWakeUpButtonPushed] =
    useState(false);

  const mutation = useMutation({
    mutationFn: (status: Database["public"]["Enums"]["alarm_status_enum"]) => {
      return updateTodayMyAlarm(status);
    },
    onSuccess: () => {
      setIsAlreadyWakeUpButtonPushed(true);
    },
  });

  const handleWakeUpButton = () => {
    // まずアラームの状態をアップデートする。（その間activity indicatorを表示する）
    mutation.mutate("success");
    // TODO早起き成功のアクションログも追加したいが、サーバー側で実装したい
    // 完了したら、isAlreadywakeupbuttonpushedをtrueにする。
  };

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
  return (
    <View className="flex-1 items-center justify-center">
      <Modal
        animationType="fade"
        transparent
        visible={wakeUpModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View className="flex-1 items-center justify-center w-9/12 ">
            <View className="m-5 w-full h-1/3 bg-white rounded-2xl p-9 items-center shadow-sm shadow-gray-300">
              {isAlreadyWakeUpButtonPushed ? (
                <>
                  <Text className="mb-6 text-center text-gray-600 text-xl font-bold">
                    起床を記録しました !
                  </Text>

                  <Text className=" text-2xl font-medium text-gray-600">9回連続成功です</Text>
                  <Pressable
                    className=" rounded-lg px-3 py-2 bg-gray-400 shadow-md shadow-slate-300 mt-8 w-5/6"
                    onPress={() => setWakeUpModalVisible(false)}
                  >
                    <Text className="text-white text-xl font-medium text-center">
                      OK
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text className="mb-6 text-center text-gray-600 text-xl font-bold">
                    おはよう !
                  </Text>

                  <Animated.View style={animatedIconStyle}>
                    <Ionicons name="alarm-outline" size={72} color="#fca5a5" />
                  </Animated.View>
                  <Pressable
                    className=" rounded-lg px-3 py-2 bg-red-300 shadow-md shadow-slate-300 mt-8 w-5/6"
                    onPress={handleWakeUpButton}
                  >
                    {mutation.isPending ? (
                      <ActivityIndicator size="large" />
                    ) : (
                      <Text className="text-white text-xl font-medium text-center">
                        おきたよ報告する
                      </Text>
                    )}
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 背景を暗くする
  },
});
