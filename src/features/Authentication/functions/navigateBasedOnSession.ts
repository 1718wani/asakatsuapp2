import { Session } from "@supabase/supabase-js";
import { fetchUserName } from "../../User/apis/fetchUserName";
import { getDefaultRoom } from "../../Room/apis/getDefaultRoomId";
import { useAtom, useSetAtom } from "jotai";
import { defaultRoomAtom } from "../../../states/defaultRoomAtom";
import { path } from "../../../consts/path";
import { router } from "expo-router";

export const NavigateBasedOnSession = async (session: Session | null) => {
  const setDefaultRoom = useSetAtom(defaultRoomAtom);
  if (session) {
    const userName = await fetchUserName(session.user.id);
    if (userName) {
      const defaultRoom = await getDefaultRoom();
      if (defaultRoom) {
        setDefaultRoom(defaultRoom);
        router.replace(path.dashboard);
      } else {
        router.replace(path.roomList);
      }
    } else {
      router.replace(path.registerUserInfo);
    }
  } else {
    router.replace(path.signIn);
  }
};
