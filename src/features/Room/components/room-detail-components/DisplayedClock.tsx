import { Text, View } from "react-native";
import { useTime } from "react-timer-hook";

export const DisplayedClock = () => {
  const { seconds, minutes, hours } = useTime({ format: "12-hour" });
  const formatNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  return (
    <View className=" p-2 bg-white rounded-md shadow-sm items-center  ">
      <Text className=" text-gray-900 font-semibold text-2xl">
        {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
      </Text>
    </View>
  );
};
