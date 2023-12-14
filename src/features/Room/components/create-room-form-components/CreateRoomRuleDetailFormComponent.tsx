import {
  Platform,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import { useState } from "react";
import { DayButton } from "../DayButton";
import { AwakeTimePickerForAndroid } from "../AwakeTimePickerForAndroid";
import { AwakeTimePickerForIos } from "../AwakeTimePickerForIos";
import { PassLImitPicker } from "../PassLimitPicker";
import { Picker } from "@react-native-picker/picker";
import { daysOfWeekArray } from "../../consts/daysOfWeekArray";
import { passLimitOptions } from "../../consts/passLimitOptionsArray";
import { Controller, useFormContext } from "react-hook-form";

export const CreateRoomRuleDetailFormComponent = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name="awakeTime"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {Platform.OS === "ios" ? (
              <AwakeTimePickerForIos date={value} setDate={onChange} />
            ) : (
              <AwakeTimePickerForAndroid date={value} setDate={onChange} />
            )}
          </>
        )}
      />

      <View className="ml-2">
        <Text className="mb-2 block  text-base font-medium">実施する曜日</Text>
      </View>
      <View>
        <View className="flex flex-row justify-around mb-4">
          {daysOfWeekArray.map((day) => (
            <Controller
              key={day}
              name="selectedDaysOfWeek"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DayButton
                  day={day}
                  selected={value.includes(day)}
                  onSelect={() => {
                    const newSelectedDays = value.includes(day)
                      ? value.filter((d: string) => d !== day)
                      : [...value, day];
                    onChange(newSelectedDays);
                  }}
                />
              )}
            />
          ))}
        </View>
      </View>
      <View className="ml-2">
        <PassLImitPicker />
      </View>
    </>
  );
};
