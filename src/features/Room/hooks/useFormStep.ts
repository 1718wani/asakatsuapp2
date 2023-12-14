import { useRouter } from "expo-router";
import { useState } from "react";
import { formStepStatusType } from "../types/formStepStatusType";

export const useFormStep = (
  formStepStatusOptionArray: formStepStatusType[]
) => {
  const [formStepStatus, setFormStepStatus] =
    useState<formStepStatusType>("basicInfo");
  const [buttonIsSubmit, setButtonIsSubmit] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    const currentIndex = formStepStatusOptionArray.indexOf(formStepStatus);
    if (currentIndex === formStepStatusOptionArray.length - 2) {
      setButtonIsSubmit(true);
    }
    if (currentIndex < formStepStatusOptionArray.length - 1) {
      setFormStepStatus(formStepStatusOptionArray[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = formStepStatusOptionArray.indexOf(formStepStatus);
    if (currentIndex === 0) router.back();
    if (buttonIsSubmit) {
      setButtonIsSubmit(false);
    }
    if (currentIndex > 0) {
      setFormStepStatus(formStepStatusOptionArray[currentIndex - 1]);
    }
  };

  return { formStepStatus, buttonIsSubmit, handleNext, handleBack };
};
