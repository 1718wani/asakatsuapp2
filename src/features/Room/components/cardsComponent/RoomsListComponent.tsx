import useSWR from "swr";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import { getAllMyRoomsForRoomsListDisplay } from "../../apis/getAllMyRoomsForRoomsListDisplay";
import { RoomCard } from "../RoomCard";

export const AllMyRoomsComponent = () => {
  const {
    data: getAllMyRooms,
    isLoading: getAllMyRoomsLoading,
    error: getAllMyRoomsError,
  } = useSWR(["allMyJoinedRooms"], () => getAllMyRoomsForRoomsListDisplay());

  return (
    <>
      {getAllMyRoomsLoading && (
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
      {getAllMyRoomsError &&
        Toast.show({
          type: "error",
          text1: "参加しているルーム一覧が取得できませんでした",
        })}
      {getAllMyRooms &&
        getAllMyRooms.map(({ status, rooms, room_id }) => {
          return (
            <RoomCard
              key={room_id}
              roomId={room_id}
              roomName={rooms?.name}
              myStatus={status}
              wakeUpTime={rooms?.rules?.wakeup_time}
              purpose={rooms?.purpose}
              participants={rooms?.room_members ?? []}
            />
          );
        })}
    </>
  );
};
