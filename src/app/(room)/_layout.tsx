import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function RoomTabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "ダッシュボード",
          tabBarIcon: () => (
            <Entypo name="area-graph" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          headerShown: false,
          title: "タイムライン",
          tabBarIcon: () => (
            <FontAwesome5 name="tasks" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
