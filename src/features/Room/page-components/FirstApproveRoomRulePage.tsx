import { CreateRoomBasicInfoFormComponent } from "../components/create-room-form-components/CreateRoomBasicInfoFormComponent";
import { CreateRoomFormStepperComponent } from "../components/create-room-form-components/CreateRoomFormStepperComponent";
import { useState } from "react";
import { formStepStatusType } from "../types/formStepStatusType";
import { FormButtonsComponent } from "../components/create-room-form-components/FormButtonsComponent";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { CreateRoomRuleDetailFormComponent } from "../components/create-room-form-components/CreateRoomRuleDetailFormComponent";
import { CreateRoomPenaltyDetailFormComponent } from "../components/create-room-form-components/CreateRoomPenaltyDetailFormComponent";
import { CreateRoomInviteMemberFormComponent } from "../components/create-room-form-components/CreateRoomInviteMemberFormComponent";
import { formStepStatusOptionArray } from "../consts/formStepStatusOptionArray";
import { useFormStep } from "../hooks/useFormStep";
import { useForm, FormProvider } from "react-hook-form";
import { dayOfWeekType } from "../types/dayOfWeekType";
import { daysOfWeekArray } from "../consts/daysOfWeekArray";
import { formProps } from "../types/formProps";



export const FirstApproveRoomRulePageComponent = () => {
  const { formStepStatus, buttonIsSubmit, handleNext, handleBack } =
    useFormStep(formStepStatusOptionArray);
  const methods = useForm<formProps>({
    defaultValues: {
      roomName: "",
      roomDescription: "",
      awakeTime: new Date(),
      selectedDaysOfWeek: [],
      selectedWeeklyOrMonthly: "weekly",
      selectedPassLimitNumber: 2,
      penaltyDescription: "",
      penaltyCountThreshold: 3,
      invitedMembers: ["", "", ""],
    },
  });
  const onSubmit = (data: formProps) => {
    console.log("フォームデータ:", data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <View className="absolute mt-12 container mx-auto ">
          <CreateRoomFormStepperComponent formStepStatus={formStepStatus} />
        </View>
        <View className="flex flex-col justify-center h-3/4 mx-7">
          {formStepStatus === "basicInfo" && (
            <CreateRoomBasicInfoFormComponent />
          )}
          {formStepStatus === "ruleDetail" && (
            <CreateRoomRuleDetailFormComponent />
          )}
          {formStepStatus === "penaltyDetail" && (
            <CreateRoomPenaltyDetailFormComponent />
          )}
          {formStepStatus === "invitation" && (
            <CreateRoomInviteMemberFormComponent />
          )}
        </View>
        <View className=" fixed ml-6 flex flex-row ">
          <TouchableOpacity
            onPress={handleBack}
            className=" bg-gray-200 rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
          >
            <Text className="font-mediue">戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              buttonIsSubmit ? methods.handleSubmit(onSubmit) : handleNext
            }
            disabled={buttonIsSubmit && !methods.formState.isValid}
            className={`rounded-lg text-sm px-5 py-2.5 text-center   ${
              buttonIsSubmit && !methods.formState.isValid
                ? "bg-teal-100"
                : "bg-teal-600"
            } `}
          >
            <Text className="font-medium text-white">
              {buttonIsSubmit ? "ルーム作成を完了する" : "次へ"}
            </Text>
          </TouchableOpacity>
        </View>
      </FormProvider>
    </>
  );
};
