import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

type ProfileImagePickerProps = {
  image: string;
  setImage: (imageUri: string) => void;
};

export const ProfileImagePicker = ({
  image,
  setImage,
}: ProfileImagePickerProps) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex flex-row items-center">
      <Image source={{ uri: image }} className="rounded-full w-16 h-16" />

      <TouchableOpacity
        onPress={pickImage}
        className="bg-teal-600 rounded-3xl shadow-lg px-3 py-2 m-2"
      >
        <Text className=" items-center text-white font-bold shadow-lg shadow-slate-800">
          アイコン変更
        </Text>
      </TouchableOpacity>
    </View>
  );
};
