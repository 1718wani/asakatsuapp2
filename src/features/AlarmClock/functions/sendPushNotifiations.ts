export const sendPushNotification = async (
  tokens: (string | null)[] | undefined,
  title: string,
  body: string
) => {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: tokens,
      sound: "default",
      title,
      body,
    }),
  }).then((res) => res.json());
};
