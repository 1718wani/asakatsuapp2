import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Button } from "react-native";
import dayjs from "dayjs";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  date: Date;
  setDate: (date: Date | undefined) => void;
};

export const AwakeTimePickerForIos = ({ date, setDate }: Props) => {
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setDate(selectedDate);
  };

  return (
    <View className="mb-5">
      <View className="flex flex-row items-center ml-2">
        <Text className="block text-base font-medium">起きる時間</Text>

        <DateTimePicker
          value={date}
          onChange={onChange}
          testID="dateTimePickerStart"
          mode="time"
          display="inline"
          accentColor="teal"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};
