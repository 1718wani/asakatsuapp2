import { useForm } from "react-hook-form";
import { updateProfile } from "../apis/updateProfile";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { defaultRoomAtom } from "../../../states/defaultRoomAtom";
import { userFormProps } from "../types/userFormProps";



export const useProfileForm = (image: string) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userFormProps>();

  const defaultRoom = useAtomValue(defaultRoomAtom);

  const onSubmit = async (data: userFormProps) => {
    try {
      await updateProfile(data.userName, image);
      console.log("プロファイルが更新されました");

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
