import { Controller, useFormContext } from "react-hook-form";
import { View, TextInput, Text, TouchableOpacity } from "react-native";

export const CreateRoomInviteMemberFormComponent = () => {
  const { control, getValues } = useFormContext();
  const array = [0, 1, 2];

  return (
    <View className="mb-4">
      <Text className="font-medium mb-2">
        招待したいユーザーのIDを入力（最大3名）
      </Text>

      {array.map((index) => (
        <Controller
          key={index}
          control={control}
          name={`invitedMembers.${index}`}
          rules={{
            validate: {
              required: () =>
                array.some(
                  (i) => getValues(`invitedMembers.${i}`)?.length > 0
                ) || "少なくとも一人以上のユーザーIDを入力してください。",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 mb-2"
              placeholder="ユーザーネームを入れてください。"
            />
          )}
        />
      ))}
    </View>
  );
};
