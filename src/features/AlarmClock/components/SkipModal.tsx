import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDefaultRoomInfo } from "../../Room/apis/getDefaultRoomInfo";
import { updateRoomMemberStatus } from "../../Room/apis/updateRoomMemberStatus";
import { getDefaultRoomId } from "../../Room/apis/getDefaultRoomId";

type props = {
  skipModalVisible: boolean;
  setSkipModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  restOfSkipCount: number;
};

export const SkipModal = ({
  skipModalVisible,
  setSkipModalVisible,
  restOfSkipCount,
}: props) => {
  const [isAlreadySkipButtonPushed, setIsAlreadySkipButtonPushed] =
    useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const roomId = await getDefaultRoomId();
      if (!roomId) {
        throw Error();
      }
      await updateRoomMemberStatus(roomId, "skipping");
      // この時点でDatabase Hookで少なくなっている。
      await getDefaultRoomInfo();
    },
    onSuccess: () => {
      setIsAlreadySkipButtonPushed(true);
      queryClient.invalidateQueries({
        queryKey: ["defaultRoomInfo"],
      });
    },
  });

  const handleSkipButton = () => {
    // まずアラームの状態をpauseにアップデートする。（その間activity indicatorを表示する）
    mutation.mutate();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Modal
        animationType="fade"
        transparent
        visible={skipModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View className="flex-1 items-center justify-center w-9/12 ">
            <View className="m-5 w-full h-1/3 bg-white rounded-2xl p-9 items-center shadow-sm shadow-gray-300">
              {isAlreadySkipButtonPushed ? (
                <>
                  <Text className="mb-6 text-center text-gray-600 text font-bold">
                    明日の早起きをスキップしました！
                  </Text>

                  <Text className=" text-xl font-medium text-gray-600 mt-2">
                    残り
                    <Text
                      style={styles.highlightText}
                      className="text-2xl font-bold"
                    >
                      {restOfSkipCount}
                    </Text>
                    回です。
                  </Text>
                  <Pressable
                    className=" rounded-lg px-3 py-2 bg-gray-400 shadow-md shadow-slate-300 mt-8 w-5/6"
                    onPress={() => {
                      setSkipModalVisible(false);
                      setIsAlreadySkipButtonPushed(false);
                    }}
                  >
                    <Text className="text-white text-xl font-medium text-center">
                      OK
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text className="mb-6 text-center text-gray-600 text-xl font-bold">
                    スキップを一つ使いますか？
                  </Text>
                  <Text className=" text-xl font-medium text-gray-600 mt-2">
                    残り
                    <Text
                      style={styles.highlightText}
                      className="text-2xl font-bold"
                    >
                      {restOfSkipCount}
                    </Text>
                    回です。
                  </Text>

                  <View className="flex flex-row gap-2 ">
                    <Pressable
                      className=" rounded-lg px-3 py-2 bg-teal-300 shadow-md shadow-slate-300 mt-8 w-2/6"
                      onPress={handleSkipButton}
                    >
                      {mutation.isPending ? (
                        <ActivityIndicator />
                      ) : (
                        <Text className="text-white text-md font-medium text-center">
                          使う
                        </Text>
                      )}
                    </Pressable>
                    <Pressable
                      className=" rounded-lg px-3 py-2 bg-gray-400 shadow-md shadow-slate-300 mt-8 w-2/6"
                      onPress={() => setSkipModalVisible(false)}
                    >
                      <Text className="text-white text-md font-medium text-center">
                        やめる
                      </Text>
                    </Pressable>
                  </View>
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
  highlightText: {
    fontStyle: "italic", // 斜体にする
  },
});
