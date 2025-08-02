import { t } from "i18next";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../../../../components/common/button/button";
import InputField from "../../../../../components/common/InputField";
import OpenModal from "../../../../../components/specific/dashboard/OpenModal";
import { useAddStaff } from "../../hooks/useAddStaff";
import SetWorkingHoursTable from "../../../../../components/common/working_hours/SetWorkingHoursTable";
import { useEffect, useState } from "react";

interface AddStaffModalProps {
  staffType: "doctor" | "secretary";
  clinicId: number;
}

const AddStaffModal = ({ staffType, clinicId }: AddStaffModalProps) => {
  const modalId = `add_${staffType}_modal`;
  const staffText = t(staffType);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const {
    resetCounter,
    handleOpenModal,
    isInputValid,
    workingHours,
    areWorkingHoursValid,
    changeWorkingHours,
    addStaffSubmit,
    emailtOrPhone,
    errors,
    handleInputChange,
  } = useAddStaff(staffType, clinicId, modalId);

  useEffect(() => {
    setIsSubmitDisabled(!(isInputValid && areWorkingHoursValid));
  }, [isInputValid, areWorkingHoursValid]);

  return (
    <>
      <Button
        title={`${t("add")} ${staffText}`}
        isPrimary={true}
        onClick={handleOpenModal}
      />
      <OpenModal
        id={modalId}
        title={`${t("add")} ${staffText}`}
        modalButton={
          <Button
            title={t("submit")}
            isPrimary={true}
            isWidthFull={false}
            onClick={addStaffSubmit}
            isDisabled={isSubmitDisabled}
          ></Button>
        }
      >
        <div className="flex flex-col gap-2">
          <InputField
            labelName={`${t("credintals.email")} ${t("or")} ${t(
              "credintals.phone"
            )}`}
            type={"text"}
            placeholder={""}
            Icon={MdDriveFileRenameOutline}
            onChange={handleInputChange}
            value={emailtOrPhone}
            error={""}
          ></InputField>
          <h2 className="font-bold">{t("working_hours")}</h2>
          <SetWorkingHoursTable
            key={`working-hours-${resetCounter}`}
            prevWorkingHours={workingHours}
            onChange={changeWorkingHours}
          />
        </div>
        {errors !== "" && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{errors}</span>
          </div>
        )}
      </OpenModal>
    </>
  );
};

export default AddStaffModal;
