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

export const RoomStatusOrStopButton = () => {
  const isDuringAwakeTime = useAtomValue(isDuringAwakeTimeAtom);

  return (
    <>
      {isDuringAwakeTime && <AwakeButton />}
      {!isDuringAwakeTime && <SkipButton />}
    </>
  );
};
