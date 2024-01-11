import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { Ionicons } from "@expo/vector-icons";

export const SkipButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };
  return (
    <>
      <View className="flex-1 items-center justify-center mt-5">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 items-center justify-center mt-5">
            <View className="m-5 w-2/3 h-1/3 bg-white rounded-xl p-9 items-center shadow-sm shadow-gray-300">
              <Text className="mb-4 text-center">
                スキップを一つ使いますか？
              </Text>
              <View className=" bottom-2 flex flex-row mx-2">
                <Pressable
                  className="rounded-lg px-3 py-2 bg-teal-500"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text className="text-white font-medium text-center">
                    閉じる
                  </Text>
                </Pressable>

                <Pressable
                  className="rounded-lg px-3 py-2 bg-gray-500"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text className="text-white font-medium text-center">
                    閉じる
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        className="bg-teal-300  rounded-full w-16 h-16  shadow-lg p-2 items-center"
      >
        <Ionicons name="flag" size={24} color="white" />
        <Text className=" text-white text-xs font-bold">Skip</Text>
      </TouchableOpacity>
    </>
  );
};