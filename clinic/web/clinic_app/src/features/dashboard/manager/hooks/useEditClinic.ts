import { useState } from "react";
import {
  validateName,
  validatePhone,
} from "../../../../utils/helpers/validation";
import { useAppDispatch } from "../../../../hooks/hooks";
import type { Clinic } from "../schemas/clinicInfoSchema";
import { t } from "i18next";
import { updateClinic } from "../slices/clinicSettingsThunk";
import type { workingHourModel } from "../../../../utils/constants/models/workingHoursModel";

export const useEditClinic = (clinicData: Clinic, modalId: string) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editedData, setEditedData] = useState<Partial<Clinic>>({});

  const transformWorkingHours = () => {
    if (!clinicData?.working_hours) return [];

    return clinicData.working_hours.map((day) => ({
      day: day.day,
      start: day.start,
      end: day.end,
    }));
  };
  const [workingHours, setWorkingHours] = useState<workingHourModel[]>(
    transformWorkingHours()
  );

  const updateWorkingHours = (newWorkingHours: workingHourModel[]) => {
    setWorkingHours(newWorkingHours);
  };

  const submitWorkingHours = async () => {
    try {
      if (!validateFields()) {
        return; // Don't submit if validation fails
      }

      await dispatch(
        updateClinic({
          clinic_id: clinicData.id,
          working_hours: workingHours,
        })
      ).unwrap();
      const modal = document.getElementById(
        modalId
      ) as HTMLDialogElement | null;
      modal?.close();
    } catch (error) {
      // Handle error if needed
      console.error("Failed to update clinic:", error);
    }
  };

  const updateField =
    <K extends keyof Clinic>(field: K) =>
    (value: Clinic[K]) => {
      setEditedData({ ...editedData, [field]: value });
      console.log(editedData);
    };

  const resetChanges = () => {
    setEditedData({});
    updateWorkingHours(transformWorkingHours());
    setErrors({});
  };

  const getChangedData = (): Partial<Clinic> & { clinic_id: number } => {
    return {
      clinic_id: clinicData.id,
      ...editedData,
    };
  };

  const hasChanges = Object.keys(editedData).length > 0;

  const validateField = <K extends keyof Clinic>(
    field: K,
    value: Clinic[K]
  ) => {
    switch (field) {
      case "name":
        if (!value || !validateName(value as string)) {
          return t("validation.clinic_name");
        }
        break;
      case "bio":
        if (!value || !validateName(value as string)) {
          return t("validation.bio");
        }
        break;
      case "phone":
        if (!value || !validatePhone(value as string)) {
          return t("validation.phone");
        }
        break;
      case "city_name":
        if (!value || !validateName(value as string)) {
          return t("validation.city_name");
        }
        break;
      case "street_name":
        if (!value || !validateName(value as string)) {
          return t("validation.street_name");
        }
        break;
      // Add other field validations as needed
      default:
        return "";
    }
    return "";
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate each edited field
    Object.entries(editedData).forEach(([field, value]) => {
      const typedField = field as keyof Clinic;
      const error = validateField(
        typedField,
        value as Clinic[typeof typedField]
      );
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = () => {
    resetChanges(); // Clear any previous changes
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

  const onSubmit = async () => {
    try {
      if (!validateFields()) {
        return; // Don't submit if validation fails
      }
      const dataToUpdate = getChangedData();
      if (hasChanges) {
        await dispatch(updateClinic(dataToUpdate)).unwrap();
      }
      const modal = document.getElementById(
        modalId 
      ) as HTMLDialogElement | null;
      modal?.close();
    } catch (error) {
      // Handle error if needed
      console.error("Failed to update clinic:", error);
    }
  };

  return {
    errors,
    setErrors,
    updateField,
    getChangedData,
    hasChanges,
    handleOpenModal,
    editedData,
    onSubmit,
    workingHours,
    updateWorkingHours,
    submitWorkingHours,
  };
};
