import { Image } from "expo-image";
import { useState } from "react";
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { DisplayedUserCodeComponent } from "../components/DisplayedUserCodeComponent";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import { updateProfile } from "../apis/updateProfile";
import { useAtomValue } from "jotai";
import { defaultRoomAtom } from "../../../states/defaultRoomAtom";
import { useProfileForm } from "../hooks/useProfileForm";
import { InitialProfileSubmitButtons } from "../components/InitialProfileSubmitButtons";
import { ProfileForm } from "../components/ProfileFormComponent";

export default function RegisterUserInfoPageComponent() {
  const [image, setImage] = useState<string>(
    "https://cdn.iconscout.com/icon/free/png-512/free-user-1851010-1568997.png?f=webp&w=512"
  );
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
      <Toast position="bottom"/>
     
    </>
  );
}
