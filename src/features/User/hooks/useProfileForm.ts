import { useForm } from "react-hook-form";
import { updateProfile } from "../apis/updateProfile";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { userFormProps } from "../types/userFormProps";
import { defaultRoomIdAtom } from "../../../states/defaultRoomAtom";
import { path } from "../../../consts/path";
import { defaultProfileImageUrl } from "../consts/defaultProfileImageUrl";
import { uploadToBucket } from "../functions/uploadToBucket";
import { getDefaultRoomId } from "../../Room/apis/getDefaultRoomId";

export const useProfileForm = (image: string) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userFormProps>();

  const onSubmit = async (data: userFormProps) => {
    // アップロード用のURLデータを変数でおく。
    let toUploadImageUrl = image;

    // アップロード用のURLデータが、デフォルトURLだった場合、アップロードされた画像をSupabaseにアップロード
    if (toUploadImageUrl !== defaultProfileImageUrl) {
      toUploadImageUrl = await uploadToBucket(image);
    }

    try {
      await updateProfile(data.userName, toUploadImageUrl);
      const roomId = await getDefaultRoomId();

      // デフォルトルームの存在に基づくルーティング
      if (roomId) {
        router.push(path.dashboard);
      } else {
        router.push(path.roomList);
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
