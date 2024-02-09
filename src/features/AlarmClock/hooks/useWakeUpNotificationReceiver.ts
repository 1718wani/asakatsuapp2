import { useQueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

export const useWakeUpNotificationReceiver = () => {
  const queryClient = useQueryClient();
  const notificationListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // 通知を受け取ったときのリスナー

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("これかな", notification.request.content.data.data);
        queryClient.invalidateQueries({
          queryKey: ["todayAlarmData"],
        });
      });

    // クリーンアップ関数
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
    };
  }, []);
};
