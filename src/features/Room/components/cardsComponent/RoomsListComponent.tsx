import useSWR from "swr";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import { getAllMyRoomsForRoomsListDisplay } from "../../apis/getAllMyRoomsForRoomsListDisplay";
import { RoomCard } from "../RoomCard";
import { Text } from "react-native";

export const AllMyRoomsComponent = () => {
  const {
    data: AllMyRooms,
    isLoading: AllMyRoomsLoading,
    error: AllMyRoomsError,
  } = useSWR(["allMyJoinedRooms"], () => getAllMyRoomsForRoomsListDisplay());

  console.log(AllMyRooms, "リストデータ");

  return (
    <>
      {AllMyRoomsLoading && (
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
      {AllMyRoomsError &&
        Toast.show({
          type: "error",
          text1: "参加しているルーム一覧が取得できませんでした",
        })}
      {AllMyRooms && AllMyRooms.length > 0 ? (
        AllMyRooms.map(({ status, rooms, room_id }) => (
          <RoomCard
            key={room_id}
            roomId={room_id}
            roomName={rooms?.name}
            myStatus={status}
            wakeUpTime={rooms?.rules?.wakeup_time}
            purpose={rooms?.purpose}
            participants={rooms?.room_members ?? []}
          />
        ))
      ) : (
        <Text className=" text-center mt-60 ">
          現在表示されるルームはありません
        </Text> // 空の場合に表示するテキスト
      )}
    </>
  );
};
