import { useForm } from "react-hook-form";
import { updateProfile } from "../apis/updateProfile";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { userFormProps } from "../types/userFormProps";
import { defaultRoomIdAtom } from "../../../states/defaultRoomAtom";



export const useProfileForm = (image: string) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userFormProps>();

  const defaultRoom = useAtomValue(defaultRoomIdAtom);

  const onSubmit = async (data: userFormProps) => {
    try {
      await updateProfile(data.userName, image);

      // デフォルトルームの存在に基づくルーティング
      if (defaultRoom) {
        router.push("/");
      } else {
        router.push("/rooms-list");
      }
    } catch (error) {
      console.error("プロファイルの更新中にエラーが発生しました:", error);
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
  };
};
