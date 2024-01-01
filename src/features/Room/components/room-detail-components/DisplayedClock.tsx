import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useTime } from "react-timer-hook";
import { isDuringAwakeTimeAtom } from "../../../../states/isDuringAwakeTimeAtom";
import { differenceInMilliseconds, parseISO } from "date-fns";

export const DisplayedClock = () => {
  const setIsDuringAwakeTime = useSetAtom(isDuringAwakeTimeAtom);
  const { seconds, minutes, hours } = useTime();
  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  useEffect(() => {
    const now = new Date();

    const futureDate = parseISO("2023-12-23T07:23:00"); // この時刻はDBから取得する必要あり
    const difference = differenceInMilliseconds(futureDate, now);
    console.log(difference,`${difference/1000}秒後にsetIsDuringAwakeTimeがONになる`)

    let timer: number | undefined;

    if (difference > 0) { // もし現在時刻が
      timer = window.setTimeout(() => setIsDuringAwakeTime(true), difference);
    } else {
      const additionalTime = 15 * 60 * 1000 - difference;
      timer = window.setTimeout(
        () => setIsDuringAwakeTime(false),
        additionalTime
      );
    }

    // クリーンアップ関数
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <View className=" p-2 bg-white rounded-md shadow-sm items-center  ">
      <Text className=" text-gray-900 font-semibold text-2xl">
        {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
      </Text>
    </View>
  );
};
