import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  date: Date;
  setDate: (date: Date | undefined) => void; // 型を変更
};

export const AwakeTimePickerForAndroid = ({ date, setDate }: Props) => {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    setShow(true);
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setShow(false);
    setDate(selectedDate); // undefined の場合も含め、選択された日付を直接設定
  };

  return (
    <>
      <View className="mb-5">
        <View className="flex flex-row items-center ml-2">
          <Text className="block text-lg font text-gray-900 mr-2">
            起きる時刻
          </Text>
          <Text className="text-lg mr-2">{dayjs(date).format("HH:mm")}</Text>

          <TouchableOpacity
            onPress={handleOnClick}
            className="bg-teal-600 w-12 items-center rounded-md"
          >
            <Text className="font-medium text-white h-4">変更</Text>
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <DateTimePicker
          value={date}
          onChange={onChange}
          testID="dateTimePickerStart"
          mode="time"
          display="spinner"
        />
      )}
    </>
  );
};
