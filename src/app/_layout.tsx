import { Link, Slot, Stack, useNavigation, usePathname } from "expo-router";

import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { path } from "../consts/path";
import { UserAvatorButton } from "../features/User/components/UserAvatorButton";
import { RootSiblingParent } from "react-native-root-siblings";
import { FontAwesome5 } from "@expo/vector-icons";
import { RoomStatusOrStopButton } from "../features/Room/components/room-detail-components/RoomStatusOrStopButton";

export default function HomeLayout() {
  const router = usePathname();
  const shouldShowButton = router === "/" || router === "/timeline";
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

              headerBackVisible: false,
            }}
          />

          <Stack.Screen
            name="create-room"
            options={{ presentation: "modal", title: "ルームを作成する" }}
          />
          <Stack.Screen
            name="edit-room-rule"
            options={{ presentation: "modal", title: "ルールを変える" }}
          />
          <Stack.Screen
            name="approve-room-rule"
            options={{ presentation: "modal", title: "ルールを承認する" }}
          />
          <Stack.Screen
            name="first-approve-room-rule"
            options={{
              presentation: "modal",
              title: "入室前にルールを確認する",
            }}
          />
          <Stack.Screen
            name="edit-user"
            options={{ presentation: "modal", title: "ユーザー情報" }}
          />
        </Stack>

        {shouldShowButton && (
          <View className="absolute bottom-0 mb-5 ml-40  ">
            <RoomStatusOrStopButton />
          </View>
        )}
      </RootSiblingParent>
    </>
  );
}
