import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

export const useWakeUpNotificationReceiver = () => {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  console.log("okkeidesu");

  useEffect(() => {
    // 通知を受け取ったときのリスナー

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("これかな", notification.request.content.data.data);
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
