import { Text, TouchableOpacity } from "react-native";

type DayButtonProps = {
  day: string;
  selected: boolean;
  onSelect: (day: string) => void;
};

export const DayButton = ({ day, selected, onSelect }: DayButtonProps) => {
  const handlePress = () => {
    onSelect(day);
  };

  const buttonStyle = selected
    ? "bg-teal-600 rounded-lg p-3 "
    : "bg-white text-black rounded-lg p-3 border border-gray-300";

  return (
    <TouchableOpacity onPress={handlePress} className={buttonStyle}>
      <Text
        className={
          selected
            ? "text-white text-sm font-medium"
            : "text-sm font-medium text-gray-900"
        }
      >
        {day}
      </Text>
    </TouchableOpacity>
  );
};
