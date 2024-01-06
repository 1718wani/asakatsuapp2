import useSWR from "swr";
import { getDefaultRoomForRoomsListDisplay } from "../../apis/getDefaultRoomForRoomsListDisplay";
import { Skeleton } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { RoomCard } from "../RoomCard";
import { CardComponentProps } from "../../types/CardComponentProps";
import { useAtomValue } from "jotai";
import { defaultRoomIdAtom } from "../../../../states/defaultRoomAtom";
import { TouchableOpacity } from "react-native";

export const DefaultCardComponent = (props: CardComponentProps) => {
  const {
    data: defaultRoom,
    isLoading: defaultRoomIsLoading,
    error: defaultRoomError,
  } = useSWR(["defaultRoom"], () =>
    getDefaultRoomForRoomsListDisplay(
      // defaultRoomがない場合、負の数を返してNullを返す
      props.defaultRoomId
    )
  );

  console.log(props.defaultRoomId, "defaultRoomをカードのときにフェッチするID");

  console.log(defaultRoom, "フェッチされたDefaultRoomのデータ");

  return (
    <>
      {defaultRoomIsLoading && (
        <Skeleton width={100} animation="wave" className=" ml-2 rounded-3xl" />
      )}
      {defaultRoomError &&
        Toast.show({
          type: "error",
          text1: "デフォルトルームが取得できませんでした",
        })}
      {defaultRoom &&  (
        <RoomCard
          roomId={defaultRoom.id}
          roomName={defaultRoom.name}
          roomStatus="デフォルト"
          wakeUpTime={defaultRoom.rules?.wakeup_time}
          penaltyThreshold={defaultRoom.rules?.penalty_threshold ?? 5}
          participants={defaultRoom.room_members}
        />
      )}
    </>
  );
};
