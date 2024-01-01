import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import { Keyboard, Text, TextInput, View } from "react-native";
import { DisplayedUserCodeComponent } from "./DisplayedUserCodeComponent";
import { userFormProps } from "../types/userFormProps";
import { ProfileImagePicker } from "./ProfileImagePicker";

type ProfileFormProps = {
  control: Control<userFormProps>;
  errors: FieldErrors;
  image: string;
  setImage: (imageUri: string) => void;
};

export const ProfileForm = ({
  control,
  errors,
  image,
  setImage,
}: ProfileFormProps) => {
  return (
    <>
      <View className="mb-3">
        <ProfileImagePicker image={image} setImage={setImage} />
      </View>
      <Text className="block text-base font-medium text-gray-900 ">
        ユーザーネーム
      </Text>
      <Controller
        name="userName"
        control={control}
        rules={{
          required: "ユーザーネームは必須です",
          minLength: { value: 1, message: "ユーザーネームは必須です" },
          maxLength: { value: 8, message: "8文字以下にしてください" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mb-3"
            placeholder="8文字以内で入力してください"
            keyboardType="default"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        )}
      />
      {errors.userName?.message && (
        <Text className=" text-red-500 ml-1 ">
          {errors.userName.message.toString()}
        </Text>
      )}

      <Text className="block text-base font-medium text-gray-900 ">
        ユーザーコード
      </Text>
      <Text className="block text-xs font-medium text-gray-600 mb-1 ">
        他のルームに参加するときにこのコードを使います
      </Text>
      <View className=" flex flex-row items-center border border-gray-400 bg-gray-50 rounded-3xl p-2 justify-between">
        <DisplayedUserCodeComponent />
      </View>
    </>
  );
};
