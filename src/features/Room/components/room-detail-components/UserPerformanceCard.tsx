import { Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export const UserPerformanceCard = () => {
  return (
    <View className=" bg-white rounded-md shadow-sm p-3">
      <View className="flex flex-row">
        <View className=" basis-1/2 items-center justify-center mr-2">
          <Text className="text-2xl font-bold">成功率85％</Text>
        </View>
        <View className=" basis-1/2">
          <Text className=" text-sm font-bold ">3回でペナルティ</Text>
          <View className="flex flex-row items-center my-1 space-x-1">
            <View className=" w-3 h-3 bg-red-400 rounded-full" />
            <View className=" w-3 h-3 bg-red-400 rounded-full" />
            <View className=" w-3 h-3 bg-red-100 rounded-full" />
            <View className=" w-3 h-3 bg-red-100 rounded-full" />
            <View className=" w-3 h-3 bg-red-100 rounded-full" />
          </View>

          <Text className=" text-sm font-bold mb-1">残ペナルティ</Text>
          <View className="flex flex-row items-center space-x-1">
            <Ionicons name="flag" size={14} color="black"  />
            <Ionicons name="flag" size={14} color="black" />
            
          </View>
          <Text className=" text-sm font-bold">あと4回パス可能</Text>
          <View className="flex flex-row items-center my-1 space-x-1">
            <View className=" w-3 h-3 bg-teal-400 rounded-full" />
            <View className=" w-3 h-3 bg-teal-400 rounded-full" />
            <View className=" w-3 h-3 bg-teal-400 rounded-full" />
            <View className=" w-3 h-3 bg-teal-400 rounded-full" />
            <View className=" w-3 h-3 bg-teal-100 rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
};
