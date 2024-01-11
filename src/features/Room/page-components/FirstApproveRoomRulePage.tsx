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
import { useLocalSearchParams, useRouter } from "expo-router";
import { CreateRoomRuleDetailFormComponent } from "../components/create-room-form-components/CreateRoomRuleDetailFormComponent";
import { CreateRoomPenaltyDetailFormComponent } from "../components/create-room-form-components/CreateRoomPenaltyDetailFormComponent";
import { CreateRoomInviteMemberFormComponent } from "../components/create-room-form-components/CreateRoomInviteMemberFormComponent";
import { formStepStatusOptionArray } from "../consts/formStepStatusOptionArray";
import { useFormStep } from "../hooks/useFormStep";
import { useForm, FormProvider } from "react-hook-form";
import { roomCreateFormProps } from "../types/roomCreateFormProps";
import useSWR from "swr";
import { getRule } from "../apis/getRule";
import { RuleDetailForFirstApproval } from "../components/RuleDetailForFirstApproval";

type RuleProps = {
  roomId: string | string[] | undefined;
};

export const FirstApproveRoomRulePageComponent = (props: RuleProps) => {
  const {
    data: rule,
    isLoading: ruleLoading,
    error: ruleError,
  } = useSWR(["roomRule"], () => getRule(Number(props.roomId)));

  console.log("取得したルール", rule);

  return (
    rule &&
    rule.rules && (
      <RuleDetailForFirstApproval
        roomId={Number(props.roomId)}
        rules={rule?.rules}
      />
    )
  );
};
