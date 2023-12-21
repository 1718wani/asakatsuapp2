import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useTime } from "react-timer-hook";
import { isDuringAwakeTimeAtom } from "../../../../states/isDuringAwakeTimeAtom";

export const DisplayedClock = () => {
  const [isDuringAwakeTime, setIsDuringAwakeTime] = useAtom(
    isDuringAwakeTimeAtom
  );
  const { seconds, minutes, hours } = useTime();
  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  // TODO useEffect以外の方法を考慮にいれて実装する。
  useEffect(() => {
    // 本来は設定時間を入れる
    if (seconds >= 5) {
      setIsDuringAwakeTime(true);
      // 本来は設定時間の15分後にする
    } else if (seconds >= 55 || seconds < 5) {
      setIsDuringAwakeTime(false);
    }
  }, [seconds, minutes, hours]);

  return (
    <View className=" p-2 bg-white rounded-md shadow-sm items-center  ">
      <Text className=" text-gray-900 font-semibold text-2xl">
        {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
      </Text>
    </View>
  );
};
