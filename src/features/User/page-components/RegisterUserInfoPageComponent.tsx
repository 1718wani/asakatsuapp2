import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useProfileForm } from "../hooks/useProfileForm";
import { InitialProfileSubmitButtons } from "../components/InitialProfileSubmitButtons";
import { ProfileForm } from "../components/ProfileFormComponent";
import { defaultProfileImageUrl } from "../consts/defaultProfileImageUrl";

export default function RegisterUserInfoPageComponent() {
  const [image, setImage] = useState<string>(defaultProfileImageUrl);
  const { handleSubmit, control, errors, onSubmit } = useProfileForm(image);

  return (
    <>
      <View className=" mx-auto my-auto pb-40">
        <View className="mb-4">
          <ProfileForm
            control={control}
            errors={errors}
            image={image}
            setImage={setImage}
          />
        </View>
        <InitialProfileSubmitButtons onSubmit={handleSubmit(onSubmit)} />
      </View>
      <Toast position="bottom" />
    </>
  );
}
