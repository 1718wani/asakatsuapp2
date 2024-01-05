import useSWR from "swr";
import { RoomCard } from "../RoomCard";
import { Skeleton } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { getAllMyInvitationsForRoomsListDisplay } from "../../apis/getAllMyInvitationsForRoomsListDisplay";

export const InvitationCardsComponent = () => {
  const {
    data: allMyInvitations,
    isLoading: allMyInvitationsIsLoading,
    error: allMyInvitationsError,
  } = useSWR(["allMyInvitations"], () =>
    getAllMyInvitationsForRoomsListDisplay()
  );

  return (
    <>
      {allMyInvitationsIsLoading && (
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
      {allMyInvitationsError &&
        Toast.show({
          type: "error",
          text1: "招待されたルーム一覧が取得できませんでした。",
        })}
      {allMyInvitations &&
        allMyInvitations.map(({ id, approved, rooms, room_id }) => {
          return (
            <RoomCard
              key={room_id}
              roomName={rooms?.name}
              roomStatus={approved ? "active" : "招待中"}
              wakeUpTime={rooms?.rules?.wakeup_time}
              penaltyThreshold={rooms?.rules?.penalty_threshold ?? 5}
              participants={rooms?.room_members ?? []}
            />
          );
        })}
    </>
  );
};
