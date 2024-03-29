import { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useAtomValue } from "jotai";

import { isDuringAwakeTimeAtom } from "../../../../states/isDuringAwakeTimeAtom";
import { AwakeButton } from "./buttons/AwakeButton";
import { SkipButton } from "./buttons/SkipButton";
import { useWakeUpNotificationReceiver } from "../../../AlarmClock/hooks/useWakeUpNotificationReceiver";
import { useQuery } from "@tanstack/react-query";
import { getTodayMyAlarm } from "../../../AlarmClock/apis/getTodayMyAlarm";
import { WakeUpModal } from "../../../AlarmClock/components/WakeUpModal";

export const RoomStatusOrStopButton = () => {
  const {
    data: todayAlarmData,
    isLoading: todayAlarmLoading,
    error: todayAlarmError,
  } = useQuery({
    queryKey: ["todayAlarmData"],
    queryFn: () => getTodayMyAlarm(),
    refetchInterval: 10000,
  });

  const [wakeUpModalVisible, setWakeUpModalVisible] = useState(false);

  const isRingingStatusPresent = (alarms: typeof todayAlarmData) => {
    // alarmsがnullまたはundefinedでないことを確認し、
    // statusが"ringing"である要素が少なくとも一つ存在するかをチェック
    return alarms?.some((alarm) => alarm.status === "ringing") ?? false;
  };

  useWakeUpNotificationReceiver();
  const hasRingingStatus = isRingingStatusPresent(todayAlarmData);

  return (
    <>
      {hasRingingStatus && (
        <WakeUpModal
          wakeUpModalVisible={wakeUpModalVisible}
          setWakeUpModalVisible={setWakeUpModalVisible}
        />
      )}
      <SkipButton />
    </>
  );
};
