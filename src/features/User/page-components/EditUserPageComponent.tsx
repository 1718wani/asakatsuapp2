import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, TouchableOpacity } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../../libs/supabase";
import { signOut } from "../functions/signOut";
import { getUserId } from "../apis/getUserId";
import { schedulePushNotification } from "../../AlarmClock/functions/schedulePushNotification";
import { useRegisterForPushNotifications } from "../../AlarmClock/hooks/useRegisterForPushNotification";
import {
  sendPushNotifications,
} from "../../AlarmClock/functions/sendPushNotifications";
import { testapi } from "../../../utils/testapi";

export default function EditUserPageComponent() {
  const { expoPushToken, notification } = useRegisterForPushNotifications();

  const handleOnClickSignOut = async () => {
    signOut();
  };

  return (
    <>
      <View className="items-center">
        <TouchableOpacity
          onPress={async () =>
            await schedulePushNotification(
              { title: "テストでさーね", body: "テストのBody" },
              new Date(new Date().getTime() + 20 * 1000)
            )
          }
          className="bg-teal-600 w-1/3 items-center rounded-md mb-10"
        >
          <Text className="font-medium text-white h-4">通知を予定する。</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <TouchableOpacity
          onPress={handleOnClickSignOut}
          className="bg-teal-600 w-1/3 items-center rounded-md"
        >
          <Text className="font-medium text-white h-4">ログアウト</Text>
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <TouchableOpacity
          onPress={async () => testapi()}
          className="bg-teal-600 w-1/3 items-center rounded-md"
        >
          <Text className="font-medium text-white h-4">クロンテスト</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
      </View>
    </>
  );
}
