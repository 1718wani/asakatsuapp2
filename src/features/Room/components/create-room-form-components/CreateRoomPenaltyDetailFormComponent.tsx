import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const CreateRoomPenaltyDetailFormComponent = () => {
  const { control } = useFormContext();
  const penaltyCountThresholdOptionsArray = [1, 2, 3, 4, 5];
  return (
    <View className=" max-w-lg ">
      <View className="mb-5 ml-2">
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          ペナルティの詳細
        </Text>
        <Controller
          name="penaltyDescription"
          control={control}
          rules={{ required: "ペナルティの説明は必須です" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="次あったときにスタバ奢る（700円まで）"
              multiline
              blurOnSubmit
              className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 "
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
        />
      </View>
      <Text className="block mb-2 ml-2 text-sm font-medium text-gray-900 ">
        ペナルティルールの設定
      </Text>
      <View className="flex flex-row items-center ml-2">
        <Controller
          name="penaltyCountThreshold"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              numberOfLines={2}
              style={{ flex: 1 }}
              itemStyle={{ fontSize: 16 }}
            >
              {penaltyCountThresholdOptionsArray.map((threshold) => (
                <Picker.Item
                  key={threshold}
                  label={`${threshold.toString()} 回目の失敗で`}
                  value={threshold}
                />
              ))}
            </Picker>
          )}
        />
        <Text className=" block  text-base font-medium ">ペナルティ</Text>
      </View>
    </View>
  );
};
