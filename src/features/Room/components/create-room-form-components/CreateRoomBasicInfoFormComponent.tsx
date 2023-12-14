import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FormButtonsComponent } from "./FormButtonsComponent";
import { Controller, useFormContext } from "react-hook-form";

export const CreateRoomBasicInfoFormComponent = () => {
  const { control } = useFormContext();

  return (
    <View className=" max-w-lg ">
      <View className="mb-5">
        <Text className="block mb-2 text-sm font-medium text-gray-900 ">
          ルームの名前
        </Text>

        <Controller
          name="roomName"
          control={control}
          rules={{
            required: "ルーム名は必須です",
            minLength: { value: 1, message: "ルーム名は必須です" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 "
              placeholder="英語勉強用朝活ルーム"
              keyboardType="default"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <View className="mb-5">
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          ルームの説明
        </Text>
        <Controller
          name="roomDescription"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 "
              placeholder="朝活をする目的やこのルームの説明"
              keyboardType="default"
              autoCapitalize="none"
              onBlur={onBlur}
              multiline
              onChangeText={onChange}
              value={value}
              blurOnSubmit
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          )}
        />
      </View>
    </View>
  );
};
