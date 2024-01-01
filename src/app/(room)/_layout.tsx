import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useLocalSearchParams, usePathname } from "expo-router";
import { Pressable, View, useColorScheme } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { path } from "../../consts/path";
import { RoomStatusOrStopButton } from "../../features/Room/components/room-detail-components/RoomStatusOrStopButton";
import Toast from "react-native-toast-message";

export default function RoomTabLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "ダッシュボード",
            tabBarIcon: () => <Entypo name="area-graph" size={24} />,
          }}
        />
        <Tabs.Screen
          name="timeline"
          options={{
            headerShown: false,
            title: "タイムライン",
            tabBarIcon: () => <FontAwesome5 name="tasks" size={24} />,
          }}
        />
      </Tabs>
      <Toast position="top" />
    </>
  );
}
