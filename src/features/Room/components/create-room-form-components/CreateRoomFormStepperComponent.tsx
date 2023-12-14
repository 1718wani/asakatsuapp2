import { View, Text } from "react-native";
import { formStepStatusType } from "../../types/formStepStatusType";

export const CreateRoomFormStepperComponent = ({
  formStepStatus,
}: {
  formStepStatus: formStepStatusType;
}) => {
  return (
    <View className="flex-row items-center justify-center w-full mb-6">
      {/* Step 1 */}
      <View>
        <Text
          className={`${
            formStepStatus === "basicInfo" ? "text-gray-800" : "text-gray-100"
          } font-bold text-base mr-2`}
        >
          1.基本情報
        </Text>
      </View>
      {/* Step 2 */}
      <View>
        <Text
          className={`${
            formStepStatus === "ruleDetail" ? "text-gray-800" : "text-gray-100"
          } font-bold text-base mr-2`}
        >
          2.ルール
        </Text>
      </View>
      {/* Step 3 */}
      <View>
        <Text
          className={`${
            formStepStatus === "penaltyDetail"
              ? "text-gray-800"
              : "text-gray-100"
          } font-bold text-base mr-2`}
        >
          3.ペナルティ
        </Text>
      </View>
      {/* Step 4 */}
      <View>
        <Text
          className={`${
            formStepStatus === "invitation" ? "text-gray-800" : "text-gray-100"
          } font-bold text-base`}
        >
          4.招待
        </Text>
      </View>
    </View>
  );
};
