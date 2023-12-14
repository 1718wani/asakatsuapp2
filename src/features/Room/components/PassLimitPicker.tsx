import {
  Platform,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { passLimitOptions } from "../consts/passLimitOptionsArray";
import { Controller, useFormContext } from "react-hook-form";

export const PassLImitPicker = () => {
  const { control } = useFormContext(); // useFormContext を使用
  return (
    <>
      <Text className=" block  text-base font-medium">パス許容回数</Text>
      <View className="flex flex-row ">
        <Controller
          name="selectedWeeklyOrMonthly"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              numberOfLines={1}
              style={{ flex: 1 }}
              itemStyle={{ fontSize: 16 }}
            >
              <Picker.Item label="週に" value="weekly" />
              <Picker.Item label="月に" value="monthly" />
            </Picker>
          )}
        />
        <Controller
          name="selectedPassLimitNumber"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              numberOfLines={1}
              style={{ flex: 1 }}
              itemStyle={{ fontSize: 16 }}
            >
              {passLimitOptions.map((limit) => (
                <Picker.Item
                  key={limit}
                  label={`${limit.toString()} 回まで`}
                  value={limit}
                />
              ))}
            </Picker>
          )}
        />
      </View>
    </>
  );
};
