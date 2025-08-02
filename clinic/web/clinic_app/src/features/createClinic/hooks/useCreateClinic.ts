import { useState } from "react";
import type { ClinicFormData } from "../../../pages/CreateClinicPage";
import {
  phoneCodes,
  type PhoneCodeInterface,
} from "../../../utils/constants/PhoneCodes";
import { validateName, validatePhone } from "../../../utils/helpers/validation";
import { useTranslation } from "react-i18next";

export const useCreateClinic = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<ClinicFormData>({
    name: "",
    bio: "",
    phone: "",
    city_name: "",
    street_name: "",
    selectedCode: phoneCodes.syria,
  });
  const handlePhoneCodeChange = (code: PhoneCodeInterface) => {
    setFormData((prev) => ({
      ...prev,
      selectedCode: code,
    }));
  };
  const handleInputChange =
    <K extends keyof ClinicFormData>(field: K) =>
    (value: ClinicFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  // const handleInputChange =
  //   (field: keyof ClinicFormData) =>
  //   (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setFormData({ ...formData, [field]: e.target.value });
  //     console.log(formData);
  //   };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name || !validateName(formData.name))
      newErrors.name = t("validation.clinic_name");
    if (!formData.bio || !validateName(formData.bio))
      newErrors.bio = t("validation.bio");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (
      !formData.phone ||
      !validatePhone(
        formData.selectedCode.code + formData.phone,
        formData.selectedCode.countryCode
      )
    )
      newErrors.phone = t("validation.phone");
    if (!formData.city_name || !validateName(formData.city_name))
      newErrors.city_name = t("validation.city");
    if (!formData.street_name || !validateName(formData.street_name))
      newErrors.street_name = t("validation.street");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const validateStep4 = () => {
  //   const newErrors: { [key: string]: string } = {};
  //   formData.working_hours.map((day) => {
  //     if (day.start >= day.end) {
  //       newErrors.working_hours = t("validation.working_time");
  //     }
  //   });
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const nextStep = () => {
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    // if (step === 4 && !validateStep4()) return;
    setStep((prev) => Math.min(prev + 1, 5));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return {
    formData,
    errors,
    step,
    handlePhoneCodeChange,
    handleInputChange,
    validateStep2,
    validateStep3,
    // validateStep4,
    nextStep,
    prevStep,
  };
};
