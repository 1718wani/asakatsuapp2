import {
  Link,
  Slot,
  SplashScreen,
  Stack,
  router,
  useNavigation,
  usePathname,
} from "expo-router";

import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { path } from "../consts/path";
import { UserAvatorButton } from "../features/User/components/UserAvatorButton";
import { RootSiblingParent } from "react-native-root-siblings";
import { FontAwesome5 } from "@expo/vector-icons";
import { RoomStatusOrStopButton } from "../features/Room/components/room-detail-components/RoomStatusOrStopButton";
import { supabase } from "../libs/supabase";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchUserName } from "../features/User/apis/fetchUserName";
import { getDefaultRoom } from "../features/Room/apis/getDefaultRoom";
import { useSetAtom } from "jotai";
import { defaultRoomAtom } from "../states/defaultRoomAtom";
import Toast from "react-native-toast-message";
import { Session } from "@supabase/supabase-js";

SplashScreen.preventAutoHideAsync();
export default function HomeLayout() {
  const setDefaultRoom = useSetAtom(defaultRoomAtom);
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialPageRouting, setInitialPageRouting] = useState(path.dashboard);

  useEffect(() => {
    // セッション状態をチェックし、適切な画面に遷移する関数
    const checkSessionAndNavigate = (session: Session | null) => {
      if (session) {
        fetchUserName(session.user.id).then((userName) => {
          if (userName) {
            getDefaultRoom().then((defaultRoom) => {
              if (defaultRoom) {
                setDefaultRoom(defaultRoom);
                setInitialPageRouting(path.dashboard);
              } else {
                setInitialPageRouting(path.roomList);
              }
            });
          } else {
            setInitialPageRouting(path.registerUserInfo);
          }
        });
      } else {
        setInitialPageRouting(path.signIn);
      }
    };

    // 現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkSessionAndNavigate(session);
    });

    // 認証状態の変化を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        checkSessionAndNavigate(session);
      }
    );

    setAppIsReady(true);
    SplashScreen.hideAsync();

    // クリーンアップ関数
    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (appIsReady) {
      router.replace(initialPageRouting);
    }
  }, [appIsReady, initialPageRouting]);
  // ボトムナビゲーションバーに重ねて表示するボタンの表示・非表示判定をする
  const pathName = usePathname();
  const shouldShowButton =
    pathName === path.dashboard || pathName === path.timeline;

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
          <Stack.Screen
            name="register-user-info"
            options={{ presentation: "modal", title: "ようこそ！" }}
          />
          <Stack.Screen
            name="sign-in"
            options={{ title: "サインイン", headerBackVisible: false }}
          />
        </Stack>

        {shouldShowButton && (
          <View className="absolute bottom-0 mb-5 ml-40  ">
            <RoomStatusOrStopButton />
          </View>
        )}
        <Toast position="bottom" />
      </RootSiblingParent>
    </>
  );
}
