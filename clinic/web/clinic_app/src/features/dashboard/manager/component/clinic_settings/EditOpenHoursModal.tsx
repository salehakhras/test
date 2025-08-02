import type { Clinic } from "../../schemas/clinicInfoSchema";
import EditButton from "../../../../../components/specific/dashboard/EditButton";
import OpenModal from "../../../../../components/specific/dashboard/OpenModal";
import Button from "../../../../../components/common/button/button";
import { useEditClinic } from "../../hooks/useEditClinic";
import SetWorkingHoursTable from "../../../../../components/common/working_hours/SetWorkingHoursTable";
import { useState } from "react";
import { t } from "i18next";

interface EditOpenHoursModalProps {
  clinicData: Clinic;
}

const EditOpenHoursModal = ({ clinicData }: EditOpenHoursModalProps) => {
  const [modalKey, setModalKey] = useState(0);
  const {
    errors,
    handleOpenModal: originalHandleOpenModal,
    workingHours,
    updateWorkingHours,
    submitWorkingHours,
  } = useEditClinic(clinicData, "edit_open_hours_modal");
  const handleOpenModal = () => {
    setModalKey((prev) => prev + 1); // Force re-render
    originalHandleOpenModal();
  };
  return (
    <>
      <EditButton onClick={handleOpenModal} />
      <OpenModal
        id="edit_open_hours_modal"
        title={`${t("edit")} ${t("open_hours")}`}
        modalButton={
          <Button
            title={t("submit")}
            isPrimary={true}
            isWidthFull={false}
            onClick={submitWorkingHours}
            isDisabled={!errors}
          ></Button>
        }
      >
        <SetWorkingHoursTable
          key={modalKey}
          clinicWorkingHours={workingHours}
          onChange={updateWorkingHours}
        />
      </OpenModal>
    </>
  );
};

export default EditOpenHoursModal;
