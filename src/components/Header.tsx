import React from "react";
import { View, Text, Image } from "react-native";

export const Header = () => {
  return (
    <View className="flex-row justify-between items-center bg-gray-200 px-8 pt-12 pb-5">
      <Text className="text-2xl font-bold">ルーム一覧</Text>
      <View className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9">
        <View className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="rounded-full w-12 h-12"
          />
        </View>
      </View>
    </View>
  );
};
