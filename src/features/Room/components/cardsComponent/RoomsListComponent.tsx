import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import { getAllMyRoomsForRoomsListDisplay } from "../../apis/getAllMyRoomsForRoomsListDisplay";
import { RoomCard } from "../RoomCard";
import { ScrollView, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRefreshOnFocus } from "../../../../hooks/useRefreshOnFocus";

export const AllMyRoomsComponent = () => {
  const {
    data: AllMyRooms,
    isLoading: AllMyRoomsLoading,
    error: AllMyRoomsError,
    refetch: refetchAllMyRooms,
  } = useQuery({
    queryKey: ["allMyJoinedRooms"],
    queryFn: () => getAllMyRoomsForRoomsListDisplay(),
  });

  useRefreshOnFocus(refetchAllMyRooms);

  return (
    <>
      {AllMyRoomsLoading && (
        <>
          {Array.from(Array(3).keys()).map((index) => (
            <Skeleton key={index} />
          ))}
        </>
      )}
      {AllMyRoomsError &&
        Toast.show({
          type: "error",
          text1: "参加しているルーム一覧が取得できませんでした",
        })}
      {AllMyRooms && AllMyRooms.length > 0 ? (
        <ScrollView>
          <View className="flex-1">
            {AllMyRooms.map(({ status, rooms, room_id }) => (
              <RoomCard
                key={room_id}
                roomId={room_id}
                roomName={rooms?.name}
                myStatus={status}
                wakeUpTime={rooms?.rules?.wakeup_time}
                purpose={rooms?.purpose}
                participants={rooms?.room_members ?? []}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text className=" text-center mt-56 ">
          現在表示されるルームはありません
        </Text>
      )}
    </>
  );
};
