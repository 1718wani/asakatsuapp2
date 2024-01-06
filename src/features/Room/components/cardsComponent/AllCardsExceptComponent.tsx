import useSWR from "swr";
import { getAllMyRoomsForRoomsListDisplayExceptDefault } from "../../apis/getAllMyRoomsForRoomsListDisplayExceptDefault";
import { CardComponentProps } from "../../types/CardComponentProps";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import { RoomCard } from "../RoomCard";

export const AllCardsExceptComponent = (props: CardComponentProps) => {
  const {
    data: allMyRooms,
    isLoading: allMyRoomsLoading,
    error: allMyRoomsError,
  } = useSWR(["allMyRoomsExceptDefault"], () =>
    getAllMyRoomsForRoomsListDisplayExceptDefault(props.defaultRoomId)
  );

  return (
    <>
      {allMyRoomsLoading && (
        <>
          {Array.from(Array(3).keys()).map((index) => (
            <Skeleton
              key={index}
              width={100}
              animation="wave"
              className=" ml-2 rounded-3xl"
            />
          ))}
        </>
      )}
      {allMyRoomsError &&
        Toast.show({
          type: "error",
          text1: "参加しているルーム一覧が取得できませんでした",
        })}
      {allMyRooms &&
        allMyRooms.map(({ rooms, room_id }) => {
          return (
            <RoomCard
              key={room_id}
              roomId={room_id}
              roomName={rooms?.name}
              roomStatus={rooms?.status}
              wakeUpTime={rooms?.rules?.wakeup_time}
              penaltyThreshold={rooms?.rules?.penalty_threshold ?? 5}
              participants={rooms?.room_members ?? []}
            />
          );
        })}
    </>
  );
};
