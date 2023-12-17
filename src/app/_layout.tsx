import { Link, Slot, Stack } from "expo-router";

import { Image, Pressable } from "react-native";
import { path } from "../consts/path";
import { UserAvatorButton } from "../features/User/components/UserAvatorButton";
import { RootSiblingParent } from "react-native-root-siblings";

export default function HomeLayout() {
  return (
    <>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "ルーム一覧",
              headerRight: () => <UserAvatorButton />,
            }}
          />

          <Stack.Screen
            name="room-detail/[id]"
            options={{
              title: "ルーム詳細",
              headerRight: () => <UserAvatorButton />,
            }}
          />
          <Stack.Screen
            name="create-room"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="edit-user"
            options={{ presentation: "modal", title: "ユーザー情報" }}
          />
        </Stack>
      </RootSiblingParent>
    </>
  );
}
