import { Link, Slot, Stack } from "expo-router";

import { Image, Pressable } from "react-native";
import { path } from "../consts/path";
import { UserAvatorButton } from "../features/User/components/UserAvatorButton";
import { RootSiblingParent } from "react-native-root-siblings";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen
            name="(room)"
            options={{
              title: "デフォルトルームの名前",
              headerRight: () => <UserAvatorButton />,
              headerLeft: () => (
                <Link href="/rooms-list" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome5
                        name="door-open"
                        size={18}
                        color="black"
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }}
          />

          <Stack.Screen
            name="rooms-list"
            options={{
              title: "ルーム一覧",
              headerRight: () => <UserAvatorButton />,
            }}
          />

          <Stack.Screen
            name="create-room"
            options={{ presentation: "modal", title: "ルームを作成する" }}
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
