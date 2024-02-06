import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { UserPerformanceProps } from "../../types/UserPerformanceProps";

export const UserPerformanceCard = (props: UserPerformanceProps) => {
  return (
    <View className=" bg-white rounded-md shadow-sm p-3">
      <View className="flex flex-row">
        <View className=" basis-1/2 items-center justify-center mr-2">
          <Text className="text-2xl font-bold">
            成功率
            {props.totalSuccessCount > 0
              ? props.totalSuccessCount /
                (props.totalFailureCount + props.totalSuccessCount)
              : 0}
            %
          </Text>
        </View>
        <View className=" basis-1/2">
          <Text className=" text-sm font-bold ">
            あと{props.penaltyThreshold - props.failureCount}回でドボン
          </Text>
          <View className="flex flex-row items-center my-1 space-x-1">
            {Array.from({ length: props.penaltyThreshold }, (_, index) => (
              <View
                key={index}
                className={`w-3 h-3 ${
                  index < props.failureCount ? "bg-red-400" : "bg-red-100"
                } rounded-full`}
              />
            ))}
          </View>

          <Text className=" text-sm font-bold mb-1">
            残ペナルティ{props.penaltyCount}
          </Text>
          <View className="flex flex-row items-center space-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Ionicons
                key={index}
                name="flag"
                size={14}
                color={index < props.penaltyCount ? "black" : "lightgray"}
              />
            ))}
          </View>
          <Text className=" text-sm font-bold">
            残り{props.skipLimit - props.skipCount}回
          </Text>
          <View className="flex flex-row items-center my-1 space-x-1">
            {Array.from({ length: props.skipLimit }, (_, index) => (
              <View
                key={index}
                className={`w-3 h-3 ${
                  index < props.skipLimit - props.skipCount
                    ? "bg-teal-400"
                    : "bg-teal-100"
                } rounded-full`}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
