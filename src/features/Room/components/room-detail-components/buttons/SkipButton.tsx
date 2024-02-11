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
import { getRule } from "../../../apis/rules/getRule";
import { getDefaultRoomId } from "../../../apis/getDefaultRoomId";
import { getRoomMembers } from "../../../apis/room_members/getRoomMembers";
import { getRoomMember } from "../../../apis/room_members/getRoomMember";
import { getUserId } from "../../../../User/apis/getUserId";
import { SkipModal } from "../../../../AlarmClock/components/SkipModal";
import { useQuery } from "@tanstack/react-query";
import { getDefaultRoomInfo } from "../../../apis/getDefaultRoomInfo";

export const SkipButton = () => {
  const [skipModalVisible, setSkipModalVisible] = useState(false);

  const {
    data: defaultRoomInfo,
    isLoading: defaultRoomInfoLoading,
    error: defaultRoomInfoError,
  } = useQuery({
    queryKey: ["defaultRoomInfo"],
    queryFn: () => getDefaultRoomInfo(),
  });

  const calculateRestOfSkipCount = (info: typeof defaultRoomInfo) => {
    const skipLimit = info?.rules?.skip_limit ?? 5;
    const skipCount = info?.room_members[0].skip_count ?? 0;
    const diff = skipLimit - skipCount;
    return diff;
  };

  const restOfSkipCount = calculateRestOfSkipCount(defaultRoomInfo);

  const handlePress = async () => {
    setSkipModalVisible(true);
  };

  const isDisabled =
    restOfSkipCount <= 0 ||
    defaultRoomInfo?.room_members[0].status === "skipping";

  return (
    <>
      <SkipModal
        skipModalVisible={skipModalVisible}
        setSkipModalVisible={setSkipModalVisible}
        restOfSkipCount={restOfSkipCount}
      />
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled} // disabled 状態を設定
        className={`rounded-full w-16 h-16  shadow-lg p-2 items-center ${
          isDisabled ? "bg-gray-400" : "bg-teal-300"
        }`} // 条件に応じて背景色を変更
      >
        <Ionicons
          name="flag"
          size={24}
          color={isDisabled ? "#d3d3d3" : "white"}
        />
        <Text
          className={`${
            isDisabled ? "text-gray-300" : "text-white"
          } text-xs font-bold`}
        >
          {isDisabled ? "利用済" : " Skip"}
        </Text>
      </TouchableOpacity>
    </>
  );
};
