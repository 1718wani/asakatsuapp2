import { Text, View } from "react-native";
import { Image } from "expo-image";
import { UserPerformanceProps } from "../../types/UserPerformanceProps";

type invitationCardForListProps = {
  avatarUrl?: string;
  userName?: string;
  status?: string;
};

export const DefaultRoomInvitationUserCards = (
  props: invitationCardForListProps
) => {
  const getStatusStyleAndText = (status: string | undefined) => {
    if (status === "invited") {
      return { bgColor: "bg-white", text: "招待中" };
    } else {
      return { bgColor: "bg-slate-300", text: "停止中" };
    }
  };

  // 現在のステータスに基づくスタイルとテキストを取得
  const { bgColor, text } = getStatusStyleAndText(props.status);
  return (
    <>
      <View className={` ${bgColor} p-1 rounded-2xl basis-1/4 ml-2`}>
        <Image
          source={{ uri: props.avatarUrl }}
          className="rounded-full w-8 h-8 mx-auto"
        />

        <Text className="text-xs mx-auto mt-1">{props.userName}</Text>
        <View className="mx-auto bg-slate-700 p-2 rounded-xl my-auto">
          <Text className=" text-white ">{text}</Text>
        </View>
      </View>
    </>
  );
};
