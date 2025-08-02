import { useState } from "react";
import { useAppDispatch } from "../../../../hooks/hooks";
import { addClinicStaff } from "../slices/clinicStaffThunk";
import { t } from "i18next";
import {
  validateEmail,
  validatePhone,
} from "../../../../utils/helpers/validation";
import type { workingHourModel } from "../../../../utils/constants/models/workingHoursModel";

export const useAddStaff = (
  role: string,
  clinicId: number,
  modalId: string
) => {
  const dispatch = useAppDispatch();
  const [isInputValid, setIsInputValid] = useState(false);
  const [areWorkingHoursValid, setAreWorkingHoursValid] = useState(false);
  const [emailtOrPhone, setemailtOrPhone] = useState<string>("");
  const [workingHours, setWorkingHours] = useState<workingHourModel[]>([]);
  const [errors, setErrors] = useState<string>("");
  const [resetCounter, setResetCounter] = useState(0);

  const resetChanges = () => {
    setIsInputValid(false);
    setAreWorkingHoursValid(false);
    setemailtOrPhone("");
    setWorkingHours([]);
    setErrors("");
  };

  const handleOpenModal = () => {
    resetChanges();
    setResetCounter((prev) => prev + 1);
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };
  const changeWorkingHours = (
    workingHours: workingHourModel[],
    areValid: boolean
  ) => {
    setAreWorkingHoursValid(areValid);
    if (areValid) {
      setWorkingHours(workingHours);
    }
  };

  const addStaffSubmit = async () => {
    try {
      if (isInputValid && areWorkingHoursValid) {
        await dispatch(
          addClinicStaff({
            clinic_id: clinicId,
            email_or_phone: emailtOrPhone,
            role: role,
            working_hours: workingHours,
          })
        );
        const modal = document.getElementById(
          modalId
        ) as HTMLDialogElement | null;
        modal?.close();
      } else {
        setErrors("Invalid data");
      }
    } catch (error) {
      setErrors(
        "Something went wrong, check if user exists or try again later"
      );
      console.error("Failed to add staff:", error);
    }
  };
  const handleInputChange = (value: string) => {
    setemailtOrPhone(value);
    const isValid =
      value !== "" && (validateEmail(value) || validatePhone(value));
    setIsInputValid(isValid);

    if (!isValid) {
      setErrors(`${t("validation.email")} ${t("or")} ${t("validation.phone")}`);
    } else {
      setErrors("");
    }
  };

  return {
    resetCounter,
    isInputValid,
    handleOpenModal,
    areWorkingHoursValid,
    changeWorkingHours,
    addStaffSubmit,
    errors,
    workingHours,
    emailtOrPhone,
    handleInputChange,
  };
};
